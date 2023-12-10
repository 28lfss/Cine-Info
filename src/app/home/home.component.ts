import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OmdbService } from '../services/omdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public recommendedMovieIds: string[] = [
    'tt0068646',
    'tt0071562',
    'tt0468569',
    'tt0167260',
    'tt0133093',
    'tt0816692',
    'tt0102926',
    'tt0245429',
    'tt0110357',
    'tt6751668',
  ];

  public recommendedSeriesIds: string[] = [
    'tt2467372',
    'tt0903747',
    'tt0944947',
    'tt3032476',
    'tt0096657',
    'tt4158110',
    'tt0290978',
    'tt1305826',
    'tt3322312',
    'tt2861424',
  ];;

    constructor(
      private router: Router,
      private omdbService: OmdbService
      ) {}

  navigateToDetails(id: string) {
    this.router.navigate(['/details', id])
  }

  getRecommendedImageURL(id: string): string {
    const apiKey = this.omdbService.getApiKey();
    return `http://img.omdbapi.com/?i=${id}&h=200&apikey=${apiKey}`;
  }
}
