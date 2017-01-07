import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { App, providers } from './app'
import { Main } from './app/containers'
import { AppBar } from './app/ui'
import {NoteCard} from "./app/ui";
import {NotesContainer} from "./app/containers/notes";
import {NoteCreator} from "./app/ui/note-creator";
import {ColorPicker} from "./app/ui/color-picker";

@NgModule({

    declarations: [
        App,
        Main,
        AppBar,
        NoteCard,
        NotesContainer,
        NoteCreator,
        ColorPicker
    ],
    providers,
    imports: [BrowserModule, FormsModule, HttpModule],
    bootstrap: [App]
})

export class AppModule{

}

platformBrowserDynamic().bootstrapModule(AppModule)