import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{

  books:any;

  book = new Book();

  constructor(private dataService:DataService){

  }

  ngOnInit():void{

    this.getBookData();

  }

  getBookData(){
    this.dataService.getData().subscribe((res:any) => {
      this.books = res.books;
    });
  }

  insertBookData(){
    this.dataService.insertData(this.book).subscribe((res:any) => {
      this.getBookData();
    });
  }

  deleteBook(id:any){

    this.dataService.deleteData(id).subscribe(res => {
      this.getBookData();
    });

  }

}
