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

  constructor(private contactService:ContactService) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe((contacts)=>{
        this.contacts=contacts;
    });
    
  }
}
