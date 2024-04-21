import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/users', pathMatch: 'full' },
      { path: 'users', component: UserListComponent },
      { path: 'user/:id', component: UserDetailsComponent }
    ])
  ],
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
