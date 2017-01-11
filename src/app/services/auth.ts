/**
 * Created by lon on 1/10/17.
 */
import {Injectable} from "@angular/core";
import {CanActivate, Router} from '@angular/router'
import 'rxjs/Rx'
import {Store} from "../store";
import {StoreHelper} from "./store-helper";
import {ApiService} from "./api";
import {Observable} from "rxjs";

@Injectable()

export class AuthService implements CanActivate{

    JWT_KEY: string = 'retain_token'
    JWT: string = 'hgfhfghf'

    constructor(
        private router : Router,
        private storeHelper: StoreHelper,
        private store: Store,
        private api: ApiService
    ){
        const token = window.localStorage.getItem(this.JWT_KEY)

        if(token){
            this.setJWT(token)
        }
    }

    setJWT(jwt: string){
        window.localStorage.setItem(this.JWT_KEY, jwt)
        this.api.setHeaders({Authorization: `Bearer ${jwt}`})
    }

    isAuthorized(): boolean{
        return Boolean(this.JWT)
    }

    canActivate(): boolean {
        const canActivate = this.isAuthorized()
        this.onCanActivate(canActivate)
        return canActivate
    }

    onCanActivate(canActivate: boolean){
        if(!canActivate){
            this.router.navigate(['', 'auth'])
        }
    }

    authenticate(path, credits): Observable<any>{
        return this.api.post(`/${path}`, credits)
            .do(res => this.setJWT(res.token))
            .do(res => this.storeHelper.update('user', res.data))
            .map(res => res.data)
    }

    signOut(){
        window.localStorage.removeItem(this.JWT_KEY)
        this.store.purge()
        this.router.navigate(['', 'auth'])
    }
}