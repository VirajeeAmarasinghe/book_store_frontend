import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { DataService } from 'src/app/service/data.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{

  books:any;

  book = new Book();

  form: FormGroup;

  submitted: boolean = false;

  files: any;

  data: any;

  constructor(private dataService:DataService, private toaster: ToastrService, private formBuilder: FormBuilder){

    this.form = new FormGroup([]);

  }

  get f(){

    return this.form.controls;

  }

  createForm(){

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      cover_image: [null, [Validators.required]]
    });

  }

  ngOnInit():void{

    this.getBookData();
    this.createForm();

  }

  getBookData(){
    this.dataService.getData().subscribe((res:any) => {
      this.books = res.books;
    });
  }

  insertBookData(){

    this.submitted = true;

    if(this.form.invalid){

      return;

    }

    const formData = new FormData();

    formData.append('cover_image', this.files, this.files.name);
    formData.append('name', this.book.name);
    formData.append('isbn', this.book.isbn);    

    this.dataService.insertData(formData).subscribe((res:any) => {

      this.data = res;

      if(this.data.status == true){

        this.toaster.success(JSON.stringify(this.data.message), '', {
          timeOut: 2000,
          progressBar: true
        });

        this.getBookData();

      } else {

        this.toaster.error(JSON.stringify(this.data.message), '', {
          timeOut: 2000,
          progressBar: true
        });

      }

      this.submitted = false;

      this.form.get('cover_image')?.reset();
      
    });
  }

  deleteBook(id:any){

    this.dataService.deleteData(id).subscribe(res => {
      this.getBookData();
    });

  }

  uploadImage(event:any){

    this.files = event.target.files[0];    

  }

}
