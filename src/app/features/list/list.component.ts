import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Contact[]>('http://localhost:3000/contacts')
      .subscribe((data) => (this.contacts = data));
  }
}
