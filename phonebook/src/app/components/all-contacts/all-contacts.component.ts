import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact';
import { faEdit, faInfo, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements OnInit {
  name: string = "";
  contacts: Array<Contact>;
  iconEdit = faEdit;
  iconInfo = faInfo;
  iconDelete = faTrash;
  iconAdd = faPlus;

  constructor(private contactsService: ContactService, private router: Router) {
  }

  ngOnInit() {
    this.contactsService.getAllContacts().subscribe((data: any) => {
      this.contacts = data;
    });
  }

  editContact(contactId: number) {
    this.router.navigate(["edit-contact", contactId]);
  }

  deleteContact(contactId: number) {

  }

  viewContact(contactId: number) {
    this.router.navigate(["contact-details", contactId]);
  }

  addContact() {
    this.router.navigate(["add-contact"]);
  }

}
