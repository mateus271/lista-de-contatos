import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-modal',
  standalone: false,
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.scss'
})
export class ContactModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { edit: boolean, contactId?: number },
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ContactModalComponent>
  ) {}
}
