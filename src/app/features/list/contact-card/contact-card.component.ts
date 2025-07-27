import { Component, Input } from '@angular/core';
import { Contact } from '../../../models/interfaces/contact';

@Component({
  selector: 'app-contact-card',
  standalone: false,
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  @Input()
  public contact: Contact = {} as Contact;
}
