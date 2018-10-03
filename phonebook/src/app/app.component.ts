import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'phonebook';

  constructor(private router: Router) {

  }

  navigate(url: string) {
    this.router.navigate(["all-contacts"]);
  }
}
