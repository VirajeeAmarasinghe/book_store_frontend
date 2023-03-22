import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  books:any;

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

}
