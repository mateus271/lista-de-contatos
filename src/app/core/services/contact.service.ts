import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from '../../models/interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public searchParam = new BehaviorSubject<string>("");
  public filteredContactsArray: Contact[] = [];

  private originalContactsArray = new BehaviorSubject<Contact[]>([]);

  private readonly API = "http://localhost:3000/contacts";

  constructor(private http: HttpClient) {}

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.API);
  }

  public getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.API}/${id}`);
  }

  public addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.API, contact);
  }

  public updateContact(id: number, contact: Partial<Contact>): Observable<Contact> {
    return this.http.patch<Contact>(`${this.API}/${id}`, contact);
  }

  public deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  public changeSearchParam(data: string): void {
    this.searchParam.next(data);
    this.searchInArray();
  }

  public searchInArray() {
    this.filteredContactsArray = this.originalContactsArray.value.filter((contact) => {
      return Object.values(contact).some((contact) => {
        if(contact && typeof contact === "string" || contact === "number"){
          return contact.toString().toLowerCase().startsWith(this.searchParam.value.toLowerCase())
        } else return false
      });
    });
  }

  public setOriginalContactsArrayData(data: Contact[]): void {
    this.originalContactsArray.next(data);
  }
}
