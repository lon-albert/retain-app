import {Injectable} from "@angular/core";
import {ApiService} from "./api";
/**
 * Created by lon on 1/7/17.
 */

@Injectable()
export class NotesService{
    path:string = '/notes'
    constructor( private api: ApiService ){

    }

    createNote(note ){
        return this.api.post(this.path, note)

    }

    getNotes(){
        return this.api.get(this.path)
    }

    completeNote(note){
        return this.api.delete(`${this.path}/${note.id}`)
    }
}