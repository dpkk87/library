import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[];
  userId: number;
  constructor(private bookService: BookService) {
    this.userId = parseInt(localStorage.getItem("userId"));
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => {
        this.books = books
      });
  }

  lendBook(bookId): void {
    const book = this.books.find(book => book.id === bookId);
    book.userId = this.userId;
    this.bookService.lendBook(this.userId, bookId)
      .subscribe(success => {
        if(success){
          alert('Book is successfull taken')
        }
      });
  }

  returnBook(bookId): void {
    const book = this.books.find(book => book.id === bookId);
    book.userId = null;
    this.bookService.returnBook(this.userId, bookId)
      .subscribe(success => {
        if(success){
          alert('Book is successfull returned')
        }
      });
  }

}
