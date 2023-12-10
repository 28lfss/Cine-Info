import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OmdbService } from './services/omdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Cine Info';
  searchTerm: string = '';

  constructor(private router: Router, private omdbService: OmdbService) {}

  searchResult() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
    }
  }
}