import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs';

import {Book} from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  booksUrl = 'http://localhost:3000/books'
  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }
}
