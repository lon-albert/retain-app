/**
 * Created by lon on 1/10/17.
 */
import {Injectable} from "@angular/core";
import {CanActivate, Router} from '@angular/router'
import 'rxjs/Rx'

@Injectable()

export class AuthService implements CanActivate{

    JWT_KEY: string = 'retain_token'
    JWT: string = 'adadsada'

    constructor(
        private router : Router,

    ){

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

}