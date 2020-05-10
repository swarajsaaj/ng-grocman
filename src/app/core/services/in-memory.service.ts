import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as groceries from '../../../assets/groceries.json';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {

  constructor() { }

  createDb() {
    return {groceries: groceries["default"]};
  }

}
