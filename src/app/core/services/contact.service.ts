import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly API = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.API);
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.API}/${id}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.API, contact);
  }

  updateContact(id: number, contact: Partial<Contact>): Observable<Contact> {
    return this.http.patch<Contact>(`${this.API}/${id}`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
