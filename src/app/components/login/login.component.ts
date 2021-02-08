import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { Constants } from '../../Constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('authenticationModal') authenticationModal: ModalDirective;

  username: string = ''; 
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthenticationService, private http: HttpClient, private router: Router) {
    console.log('Constructor LoginComponent');
  }

  ngAfterViewInit(): void {
    this.authenticationModal.show();
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/users']);
    }
  }

  showModal(): void {
    if (!localStorage.getItem('user')) {
      this.authenticationModal.show();
    }
  }

  login() {
    if (!isNaN(Number(this.username))) {
      this.errorMessage = 'Username / Password are invalid.';
      return;
    }
    this.auth.authenticate(this.username, this.password).subscribe(data => {
      if (!localStorage.getItem('user')) {
        this.errorMessage = 'Username / Password are invalid.';
      } else {
        this.router.navigate(['/users']);
      }
    },
      error => {
        this.errorMessage = Constants.INTERNAL_SERVER_ERROR_MESSAGE;
      }
    )
  }

  clearFormData() {
    this.errorMessage = "";
    this.password = "";
  }


}
