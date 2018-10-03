import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact';
import { MessageService } from '../../services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { MessagesComponent } from '../messages/messages.component';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  newContact: Contact = new Contact();

  constructor(private contactsService: ContactService, private messageService: MessageService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  addContact() {
    if(this.newContact.firstName && this.newContact.phoneNumber) this.contactsService.addContact(this.newContact).then(() => {});
    else {
      this.messageService.add("Please fill in new name and phone number");
      const dialogRef = this.dialog.open(MessagesComponent, {
        width: '250px',
        data: {name: ""}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }
}
