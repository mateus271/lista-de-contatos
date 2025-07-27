import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactModalComponent } from './features/contact-modal/contact-modal.component';
import { ContactService } from './core/services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "Agenda - Grupo II";
  icon = "chevron_forward";

  constructor(private matDialog: MatDialog, private contactService: ContactService) {}

  public addNewContact(): void {
    this.matDialog.open(ContactModalComponent, {
      data: {
        edit: false
      },
      width: "500px",
      height: "500px"
    });
  }

  public handleKeydown($event: Event) {
    setTimeout(() => {
      this.contactService.changeSearchParam(($event.target as HTMLInputElement).value);
    }, 200)
  }
}
