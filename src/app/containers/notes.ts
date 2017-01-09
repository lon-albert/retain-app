/**
 * Created by lon on 1/6/17.
 */
import {Component, OnDestroy} from '@angular/core'
import { NotesService } from '../services'
import {Store} from "../store";
import {Subscription} from "rxjs";
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

export class Notes implements OnDestroy {

    notesSub: Subscription

    /**
     * Although the Notes container is destroyed each time, the subscription is not.
     * In fact, that subscription will keep the notes container object alive in memory even though we think of it as destroyed.
     * Each time when we initialize the notes container, a new container object is created, while the old ones still linger in memory
     */
    ngOnDestroy(): void {
        this.notesSub.unsubscribe(); // To avoid memory leaks
    }

    constructor(private noteService: NotesService,
                private store: Store) {
        this.noteService.getNotes()
            .subscribe()

        this.notesSub = this.store.changes
            .map((data => data.notes))
            .subscribe(notes => this.notes = notes)
    }

    notes = []

    onNoteChecked(note) {
        this.noteService.completeNote(note)
            .subscribe()
    }

    onCreateNote(note) {
        this.noteService.createNote(note)
            .subscribe()
    }
}