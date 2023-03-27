import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from 'src/app/confirmed.validator';

import { DataService } from 'src/app/service/data.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  form: FormGroup;

  submitted: boolean = false;

  data: any;

  constructor(private formBuilder:FormBuilder, private dataService: DataService, private toastr: ToastrService){

    this.form = new FormGroup([]);

  }

  createForm(){
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'password_confirmation')
    });
  }

  get f(){

    return this.form.controls;

  }

  submit(){

    this.submitted = true;

    if(this.form.invalid){

      return;

    }

    this.dataService.registerUser(this.form.value).subscribe((res:any) => {       
      this.data = res;

      if(this.data.status === 1){

        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });

      } else {

        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });

      }

      this.submitted = false;

      this.form.get('name')?.reset();
      this.form.get('email')?.reset();
      this.form.get('password')?.reset();
      this.form.get('password_confirmation')?.reset();
    });

  }

  ngOnInit():void{

    this.createForm();

  }

}
