import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';

import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'books', component: BookListComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,    
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
