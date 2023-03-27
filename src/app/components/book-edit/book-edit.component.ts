import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit{

  id: any;

  data: any;

  book = new Book();

  constructor(private route:ActivatedRoute, private dataService:DataService){

  }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];

    this.getBook();

  }

  getBook(){
    this.dataService.getBookById(this.id).subscribe((res: any) => {
      this.book = res.book;
    });
  }

  updateBook(){
    this.dataService.updateBook(this.id, this.book).subscribe((res:any) => {
      console.log(res);
    });
  }

}
