import { Component, Input } from '@angular/core';
import { Contact } from '../../../models/interfaces/contact';
import { MatDialog } from '@angular/material/dialog';
import { ContactModalComponent } from '../../contact-modal/contact-modal.component';
import { ContactService } from '../../../core/services/contact.service';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-contact-card',
  standalone: false,
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  @Input()
  public contact: Contact = {} as Contact;

  constructor(private matDialog: MatDialog, private contactService: ContactService) {}

  public getInitials(): string {
    if (!this.contact?.name) return '';
    const parts = this.contact.name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  public editContact(contactId: string) {
    this.matDialog.open(ContactModalComponent, {
      data: {
        edit: true,
        contactId: contactId
      },
      width: "500px",
      height: "500px"
    });
  }

  public removeContact(contactId: string) {
    const deleteContactDialog = this.matDialog.open(ConfirmationModalComponent, {
      width: '300px',
      height: '250px',
      data: {
        contactId
      }
    });

    deleteContactDialog.afterClosed().subscribe((confirmedDeletion: boolean) => {
      if (confirmedDeletion) {
        this.contactService.deleteContact(contactId).subscribe();
      }
    });
  }
}
