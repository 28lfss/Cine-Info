import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../services/omdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResults: any[] = [];
  searchTerm: string = '';

  constructor(private activatedRoute: ActivatedRoute, private omdbService: OmdbService) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchTerm = params['q'];
      if (this.searchTerm) {
        this.searchResult();
      }
    });
  }

  searchResult() {
    this.omdbService.searchResult(this.searchTerm).subscribe((data: any) => {
      this.searchResults = data.Search || [];
    });
  }

  hasResults(): boolean {
    return this.searchResults.length > 0;
  }
}
