import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    username = '';
    password = '';
    invalidLogin = false;

    constructor(private router: Router,
        private loginservice : AuthService) { }

    ngOnInit() {
    }

    checkLogin() {
        if (this.username !== null || this.username !== '' && this.password !== null || this.password !== '') {
            (this.loginservice.authenticate(this.username, this.password).subscribe(
                data => {
                    this.router.navigate(['/products']);
                    this.invalidLogin = false;
                },
                error => {
                    this.invalidLogin = true;

                }
            )
            );
        } else {
            console.log('Username or Password is null');
        }
    }
}
