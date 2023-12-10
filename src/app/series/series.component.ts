import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../services/omdb.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
})
export class SeriesComponent implements OnInit {
  series: any[] = [];
  itemsPerPage = 12;
  currentPage = 1;

  constructor(private omdbService: OmdbService) {}

  ngOnInit() {
    this.loadSeries();
  }

  loadSeries() {
    this.omdbService.getSeriesByIds().subscribe((data: any) => {
      this.series = data || [];
      this.sortSeriesByYear();
    });
  }
  
  sortSeriesByYear() {
    this.series.sort((a, b) => b.Year.localeCompare(a.Year));
  }

  getPaginatedSeries(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.series.slice(startIndex, endIndex);
  }

  getSerieImageURL(id: string): string {
    const apiKey = this.omdbService.getApiKey();
    return `http://img.omdbapi.com/?i=${id}&h=400&apikey=${apiKey}`;
  }

  nextPage() {
    const totalPages = Math.ceil(this.series.length / this.itemsPerPage);
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