import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { StalDraggableModule } from 'src/@stal-draggable/stal-draggable.module';

@NgModule({
	imports: [
		BrowserModule,
		StalDraggableModule,
		FormsModule,

	],
	providers: [

	],
	declarations: [
		AppComponent,
		MainViewComponent,

	],
	bootstrap: [AppComponent]
})
export class AppModule { }
