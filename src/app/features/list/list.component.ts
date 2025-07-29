import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/interfaces/contact';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  contacts: Contact[] = [];
  groupedContacts: { initial: string; contacts: Contact[] }[] = [];

  constructor(public contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe((contacts) => {
      const sorted = contacts.sort((a, b) => a.name.localeCompare(b.name));
      this.contactService.filteredContactsArray = sorted;
      this.contactService.setOriginalContactsArrayData(sorted);
      this.groupedContacts = this.groupByInitial(sorted);
    });
    // this.contactService.getContacts().subscribe((contacts) => {
    //   this.contactService.filteredContactsArray = contacts.sort((a, b) =>
    //     a.name.localeCompare(b.name)
    //   );
    //   this.contactService.setOriginalContactsArrayData(contacts);
    // });
  }

  private groupByInitial(contacts: Contact[]) {
    const groups: { [initial: string]: Contact[] } = {};

    contacts.forEach((contact) => {
      const initial = contact.name.charAt(0).toUpperCase();
      if (!groups[initial]) {
        groups[initial] = [];
      }
      groups[initial].push(contact);
    });

    return Object.keys(groups)
      .sort()
      .map((initial) => ({
        initial,
        contacts: groups[initial],
      }));
  }
}
