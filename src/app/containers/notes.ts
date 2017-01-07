/**
 * Created by lon on 1/6/17.
 */
import { Component } from '@angular/core'
import { NotesService } from '../services'
@Component({
    selector: 'notes-container',
    styles:
        [`
            .notes {
              padding-top: 50px;
            }
            .creator {
              margin-bottom: 40px; 
            }
        `],
    template:
        `
            <div class="row center-xs notes">
              <div class="col-xs-6 creator">
                <note-creator (createNote)="onCreateNote($event)"></note-creator>
              </div>
              <div class="notes col-xs-8">
                <div class="row between-xs">
                
                  <note-card
                    class="col-xs-4"
                    [note]="note"
                    *ngFor="let note of notes; let i = index"
                    (checked)="onNoteChecked($event)"
                  >
                  </note-card>
                </div>
              </div>
            </div>
        `
})

export class NotesContainer{

    constructor(private noteService: NotesService){
        this.noteService.getNotes()
            .subscribe( resp => this.notes = resp.data)
    }

    notes = []

    onNoteChecked(note){
        this.noteService.completeNote(note)
            .subscribe( note => {
                const i = this.notes.findIndex(localNote => localNote.id === note.id)
                this.notes.splice(i, 1)
            })
    }

    onCreateNote(note){
        this.noteService.createNote(note)
            .subscribe( note => this.notes.push(note))
    }
}