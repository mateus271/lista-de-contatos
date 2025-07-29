import { Component, Input } from '@angular/core';
import { Contact } from '../../../models/interfaces/contact';
import { MatDialog } from '@angular/material/dialog';
import { ContactModalComponent } from '../../contact-modal/contact-modal.component';

@Component({
  selector: 'app-contact-card',
  standalone: false,
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss',
})
export class ContactCardComponent {
  @Input()
  public contact: Contact = {} as Contact;

  constructor(private matDialog: MatDialog) {}

  getInitials(): string {
    if (!this.contact?.name) return '';
    const parts = this.contact.name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  public editContact(contactId: number) {
    this.matDialog.open(ContactModalComponent, {
      data: {
        edit: true,
        contactId: contactId,
      },
      width: '500px',
      height: '500px',
    });
  }
}
