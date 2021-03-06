import {Injectable} from "@angular/core";
import {ApiService} from "./api";
import {StoreHelper} from "./store-helper";
/**
 * Created by lon on 1/7/17.
 */

@Injectable()
export class NotesService{
    path:string = '/notes'
    constructor(
        private api: ApiService,
        private storeHelper: StoreHelper
    ){

    }

    createNote(note ){
        return this.api.post(this.path, note)
            .do(savedNote =>this.storeHelper.add('notes', savedNote))
    }

    getNotes(){
        return this.api.get(this.path)
            .do((resp: any) => this.storeHelper.update('notes', resp.data))
    }

    completeNote(note){
        return this.api.delete(`${this.path}/${note.id}`)
            .do((res:any) => this.storeHelper.findAndUpdate('notes', res.id))
    }
}