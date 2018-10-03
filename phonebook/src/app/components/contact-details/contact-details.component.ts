import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Contact } from '../../model/contact';
import { ContactService } from '../../services/contact.service';

/**
 * Page that displays contact details as read-only data
 */
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  id: number;

  selectedContact: Contact;

  constructor(private contactsService: ContactService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params: Params) => {
      this.id = params['id'];

      this.selectedContact = await this.contactsService.getContact(this.id);
    });
  }

}
