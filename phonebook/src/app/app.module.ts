import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { AllContactsComponent } from './components/all-contacts/all-contacts.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ContactService } from './services/contact.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from './services/message.service';
import { ConfirmationService } from './services/confirmation.service';
import { MessagesComponent } from './components/messages/messages.component';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

const appRoutes: Routes = [
  {
    path: 'contact-details/:id',
    component: ContactDetailsComponent
  },
  {
    path: 'add-contact',
    component: AddContactComponent
  },
  {
    path: 'edit-contact/:id',
    component: EditContactComponent
  },
  {
    path: 'all-contacts',
    component: AllContactsComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: '',
    redirectTo: '/all-contacts',
    pathMatch: 'full'
  }];
@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    AllContactsComponent,
    EditContactComponent,
    AddContactComponent,
    MessagesComponent
  ],
  entryComponents: [MessagesComponent],
  exports: [
    AppComponent,
    ContactDetailsComponent,
    AllContactsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    FontAwesomeModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [ContactService, MessageService, ConfirmationService, 
        {provide: MatDialogRef, useValue: {}},
     {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
