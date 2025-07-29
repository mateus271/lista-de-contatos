import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from '../../models/interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public searchParam = new BehaviorSubject<string>('');
  public filteredContactsArray: Contact[] = [];

  private highestId: number = 0;
  private originalContactsArray: Contact[] = [];
  private originalContactsArray$ = new BehaviorSubject<Contact[]>([]);

  private readonly API = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) {}

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.API);
  }

  public getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.API}/${id}`);
  }

  public addContact(contact: Partial<Contact>): Observable<Contact> {
    const gerarId = () =>
      Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
    const fullContact = { id: gerarId, ...contact };
    console.log(fullContact);
    return this.http.post<Contact>(this.API, fullContact);
  }

  public updateContact(contact: Contact): Observable<Contact> {
    return this.http.patch<Contact>(`${this.API}/${contact.id}`, contact);
  }

  public deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  public changeSearchParam(data: string): void {
    this.searchParam.next(data);
    this.searchInArray();
  }

  public searchInArray() {
    this.filteredContactsArray = this.originalContactsArray$.value.filter(
      (contact) => {
        return Object.values(contact).some((contact) => {
          if (
            (contact && typeof contact === 'string') ||
            contact === 'number'
          ) {
            return contact
              .toString()
              .toLowerCase()
              .startsWith(this.searchParam.value.toLowerCase());
          } else return false;
        });
      }
    );
  }

  public setOriginalContactsArrayData(data: Contact[]): void {
    this.originalContactsArray = data;
    this.originalContactsArray$.next(data);
  }

  public findContactById(contactId: number): Contact | undefined {
    return this.originalContactsArray.find(
      (contact) => contact.id === contactId
    );
  }

  private setHighestId(): void {
    const contactWithHighestId = this.originalContactsArray.reduce(
      (previousValue, currentValue) => {
        return previousValue && previousValue.id > currentValue.id
          ? previousValue
          : currentValue;
      }
    );

    this.highestId = contactWithHighestId.id;
  }
}
