import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(private authentocationService: AuthService,
        private router: Router) { }

    ngOnInit() {
        this.authentocationService.logOut();
        this.router.navigate(['']);
    }

}
