import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Contact } from '../../models/interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public searchParam = new BehaviorSubject<string>("");
  public filteredContactsArray: Contact[] = [];

  // private highestId: number = 0;
  private originalContactsArray: Contact[] = [];
  private originalContactsArray$ = new BehaviorSubject<Contact[]>([]);

  private readonly API = "http://localhost:3000/contacts";

  constructor(private http: HttpClient) { }

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.API);
  }

  public getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.API}/${id}`);
  }

  public addContact(contact: Partial<Contact>): Observable<Contact> {
    const gerarId = () => Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
    const fullContact = { id: gerarId, ...contact };

    return this.http.post<Contact>(this.API, fullContact).pipe(
      tap(() => this.updateListsAfterEvent())
    );
  }

  public updateContact(contact: Contact): Observable<Contact> {
    return this.http.patch<Contact>(`${this.API}/${contact.id}`, contact).pipe(
      tap(() => this.updateListsAfterEvent())
    );
  }

  public deleteContact(id: string): Observable<any> {
    return this.http.delete(`${this.API}/${id}`).pipe(
      tap(() => this.updateListsAfterEvent())
    );
  }

  public changeSearchParam(data: string): void {
    this.searchParam.next(data);
    this.searchInArray();
  }

  public searchInArray() {
    this.filteredContactsArray = this.originalContactsArray$.value.filter((contact) => {
      return Object.values(contact).some((contact) => {
        if(contact && typeof contact === "string" || contact === "number"){
          return contact.toString().toLowerCase().startsWith(this.searchParam.value.toLowerCase())
        } else return false
      });
    });
  }

  public setOriginalContactsArrayData(data: Contact[]): void {
    this.originalContactsArray = data;
    this.originalContactsArray$.next(data);
  }

  public findContactById(contactId: string): Contact | undefined {
    return this.originalContactsArray.find(contact => contact.id === contactId);
  }

  public clearSearch(): void {
    this.searchParam.next("");
    this.filteredContactsArray = [...this.originalContactsArray];
  }

  public updateListsAfterEvent(): void {
    this.getContacts().subscribe((contacts) => {
      this.filteredContactsArray = contacts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      this.setOriginalContactsArrayData(contacts);
    });
  }
}
