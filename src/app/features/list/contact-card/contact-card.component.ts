import { Component, Input } from '@angular/core';
import { Contact } from '../../../models/interfaces/contact';
import { MatDialog } from '@angular/material/dialog';
import { ContactModalComponent } from '../../contact-modal/contact-modal.component';

@Component({
  selector: 'app-contact-card',
  standalone: false,
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  @Input()
  public contact: Contact = {} as Contact;

  constructor(private matDialog: MatDialog) {}

  public editContact(contactId: number) {
    this.matDialog.open(ContactModalComponent, {
      data: {
        edit: true,
        contactId: contactId
      },
      width: "500px",
      height: "500px"
    });
  }
}
