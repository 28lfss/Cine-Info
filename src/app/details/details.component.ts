import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../services/omdb.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  movieDetails: any;

  constructor(private activatedRoute: ActivatedRoute, private omdbService: OmdbService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const imdbID = params['id'];
      if (imdbID) {
        this.loadMovieDetails(imdbID);
      }
    });
  }

  loadMovieDetails(imdbID: string) {
    this.omdbService.getMovieDetails(imdbID).subscribe((data: any) => {
      this.movieDetails = data;
    });
  }
}