import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs';

import {Book} from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  booksUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.booksUrl}/books`);
  }

  lendBook(userId, bookId): Observable<boolean> {
    return this.http.put<boolean>(`${this.booksUrl}/users/${userId}/books/${bookId}`,{});
  }

  returnBook(userId, bookId): Observable<boolean> {
    return this.http.delete<boolean>(`${this.booksUrl}/users/${userId}/books/${bookId}`,{});
  }
}
