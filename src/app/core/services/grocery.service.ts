import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGrocery } from 'src/app/shared/models/grocery.model';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  API_URL='/api/groceries';

  constructor(private client:HttpClient) { }

  getAll():Observable<any>{
    return this.client.get<any>(this.API_URL);
  }

  save(body:IGrocery):Observable<any>{
    return this.client.post<any>(this.API_URL,body);
  }

  edit(body:IGrocery):Observable<any>{
    return this.client.put<any>(this.API_URL,body);
  }

  delete(id:number):Observable<any>{
    return this.client.delete<any>(this.API_URL+"/"+id);
  }

  get(id:number):Observable<any>{
    return this.client.get<any>(this.API_URL+"/"+id);
  }

}
