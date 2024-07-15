// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  getUsers(): any[] {
    const localData = localStorage.getItem('userData');
    return localData ? JSON.parse(localData) : [];
  }

  saveUser(userArr: any[]): void {
    localStorage.setItem('userData', JSON.stringify(userArr));
  }
}
