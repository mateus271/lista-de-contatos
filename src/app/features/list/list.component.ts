import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/interfaces/contact';
import { ContactService } from '../../core/services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(
    public contactService: ContactService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reloadContacts();
  }

  reloadContacts(): void {
    this.contactService.updateListsAfterEvent();
  }

  openModal(contactId?: string): void {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      data: {
        edit: !!contactId,
        contactId: contactId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadContacts();
      }
    });
  }

  deleteContact(contactId: string): void {
    this.contactService.deleteContact(contactId).subscribe(() => {
      this.reloadContacts();
    });
  }
}
