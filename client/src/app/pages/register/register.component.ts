/*
Register page - component
Bhavna Pulliahgari
300931671
04/06/2019
*/

import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user: User;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  // Checking a new user is registered with accurate information entered in the fields for a successful registration
  onRegisterSubmit(): void {
    this.authService.registerUser(this.user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Registration successful, Please login now', {cssClass: 'alert-success', timeOut: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Registration error occured, Please try again', {cssClass: 'alert-danger', timeOut: 3000});
        this.router.navigate(['/register']);
      }
    } );
  }
}
