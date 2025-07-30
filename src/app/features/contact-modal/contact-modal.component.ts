import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../models/interfaces/contact';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-contact-modal',
  standalone: false,
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.scss',
})
export class ContactModalComponent implements OnInit {
  public contactBeingEdited: Contact | undefined;
  public phoneMask: string = '(00) 00000-0000';

  public contactForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { edit: boolean; contactId?: string },
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ContactModalComponent>,
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.data.edit && this.data.contactId) {
      this.contactBeingEdited = this.contactService.findContactById(
        this.data.contactId
      );

      this.contactForm.patchValue({
        name: this.contactBeingEdited?.name,
        email: this.contactBeingEdited?.email,
        phone: this.contactBeingEdited?.phone,
      });
    }
  }

  public saveChanges(): void {
    if (this.data.contactId) {
      const { name, email, phone } = this.contactForm.value;

      const updatedContact: Contact = {
        id: this.data.contactId!,
        name,
        email,
        phone,
      };

      this.contactService.updateContact(updatedContact).subscribe(() => {
        this.snackBar.open('Informações do contato foram atualizadas!', 'Fechar', {
          duration: 3000,
        });

        this.clearSearchAndCloseModal();
      });
    }

  }

  public addContact(): void {
    const { name, email, phone } = this.contactForm.value;

    const newContact: Partial<Contact> = { name, email, phone };

    this.contactService.addContact(newContact).subscribe(() => {
      this.snackBar.open('Novo Contato adicionado!', 'Fechar', {
        duration: 3000,
      });

      this.contactService.getContacts().subscribe((contacts) => {
        this.contactService.filteredContactsArray = contacts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );;
      });

      this.clearSearchAndCloseModal();
    });
  }

  private clearSearchAndCloseModal(): void {
    this.contactService.clearSearch();

    this.dialogRef.close(true);
  }

  closeByBtn(): void {
    this.dialogRef.close();
  }
}
