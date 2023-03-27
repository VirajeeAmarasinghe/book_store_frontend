import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient:HttpClient) { }

  getData() {
    return this.httpClient.get('http://localhost:8000/api/book');
  }

  insertData(data:any){
    return this.httpClient.post('http://localhost:8000/api/book', data);
  }

  deleteData(id:any) {
    return this.httpClient.delete('http://localhost:8000/api/book/'+id);
  }

  getBookById(id:any){

    return this.httpClient.get('http://localhost:8000/api/book/'+id);

  }

  updateBook(id:any, data:any){

    return this.httpClient.put('http://localhost:8000/api/book/'+id, data);

  }

  registerUser(data: any) {

    return this.httpClient.post('http://localhost:8000/api/register', data);

  }
  
}
