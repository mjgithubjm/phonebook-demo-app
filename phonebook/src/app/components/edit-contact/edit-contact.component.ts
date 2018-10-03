import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  id: number;
  selectedContact: Contact;

  constructor(private contactsService: ContactService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      this.id = params['id'];

      this.selectedContact = await this.contactsService.getContact(this.id);

    });
  }

  editContact() {
    this.contactsService.editContact(this.selectedContact);
  }

}
