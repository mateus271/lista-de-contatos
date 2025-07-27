import { Injectable } from '@angular/core';
const CONTACTS=Array.from({length:50},(_,i)=>({
      id: i+1,
      name: `Nome_${i+1}`,
      email: `email_${i+1}@Gmail.com`,
      phone: "11999999999"
    
}));
@Injectable({
  providedIn: 'root'
})
export class BackServiceService {

  constructor() { }
}
