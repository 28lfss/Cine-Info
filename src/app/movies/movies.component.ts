import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../services/omdb.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  itemsPerPage = 12;
  currentPage = 1;

  constructor(private omdbService: OmdbService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.omdbService.getMoviesByIds().subscribe((data: any) => {
      this.movies = data || [];
      this.sortMoviesByYear();
    });
  }
  
  sortMoviesByYear() {
    this.movies.sort((a, b) => b.Year.localeCompare(a.Year));
  }

  getPaginatedMovies(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.movies.slice(startIndex, endIndex);
  }

  getMovieImageURL(id: string): string {
    const apiKey = this.omdbService.getApiKey();
    return `http://img.omdbapi.com/?i=${id}&h=400&apikey=${apiKey}`;
  }

  nextPage() {
    const totalPages = Math.ceil(this.movies.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.scrollToTop();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.scrollToTop();
    }
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}