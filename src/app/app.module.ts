import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: 'books', 
    component: BooksComponent,
    canActivate: [AuthGuard]
  },
  { path: 'edit/:id', 
    component:BookEditComponent,
    canActivate: [AuthGuard]
  },
  { path: '', 
    component:HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register', component:RegisterComponent },
  { path: 'login', component:LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    NavbarComponent,
    BookEditComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),    
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
