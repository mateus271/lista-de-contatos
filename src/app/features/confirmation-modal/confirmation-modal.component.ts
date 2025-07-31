import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactService } from '../../core/services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from '../../models/interfaces/contact';

@Component({
  selector: 'app-confirmation-modal',
  standalone: false,
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {
  public contactBeingDeleted: Contact | undefined;
  public confirmedDelete: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { contactId: string },
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.contactBeingDeleted = this.contactService.findContactById(this.data.contactId);
  }

  closeByBtn(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.confirmedDelete = true;
    this.dialogRef.close(this.confirmedDelete);
    this.snackBar.open('Contato excluído!', 'Fechar', {
      duration: 3000,
    });
  }
}
