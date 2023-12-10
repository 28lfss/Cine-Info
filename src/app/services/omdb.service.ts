import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  private apiKey = 'YOUR API KEY';
  private apiUrl = 'http://www.omdbapi.com';

  private movieIds = [
    'tt3748528', 'tt1677720', 'tt1139797', 'tt9603212', 'tt10366206', 'tt1563738',
    'tt0265459', 'tt1327194', 'tt1570728', 'tt1517268', 'tt0314331', 'tt10648342',
    'tt1155056', 'tt0272338', 'tt6791350', 'tt0325980', 'tt1825683', 'tt0119654', 
    'tt3480822', 'tt0120912', 'tt1409024', 'tt9114286', 'tt6443346', 'tt1245526', 
    'tt2873282', 'tt1821694', 'tt8097030', 'tt1486185', 'tt9362722', 'tt0758752', 
    'tt1000774', 'tt1956620', 'tt1261945', 'tt0439572', 'tt6718170', 'tt4669788',
    'tt0111161', 'tt5462602', 'tt1126590', 'tt10638522', 'tt0335266', 'tt0119567',
    'tt1745960', 'tt7286456', 'tt13320622', 'tt5052448', 'tt2017038', 'tt0993846',
    'tt1431045', 'tt0172156', 'tt1284575', 'tt1502397', 'tt6628394', 'tt0307987', 
    'tt0137523', 'tt2582802', 'tt3063516', 'tt2906216', 'tt0142342', 'tt1049413',
  ];
  private serieIds = [
    'tt0903747', 'tt5491994', 'tt0795176', 'tt0185906', 'tt0944947', 'tt0306414', 
    'tt0071075', 'tt2861424', 'tt0141842', 'tt2395695', 'tt0081846', 'tt1355642', 
    'tt2560140', 'tt1533395', 'tt0386676', 'tt1475582', 'tt1877514', 'tt0103359', 
    'tt2098220', 'tt0877057', 'tt3032476', 'tt1806234', 'tt0098769', 'tt2092588', 
    'tt2356777', 'tt0098904', 'tt0213338', 'tt0092337', 'tt7920978', 'tt2802850', 
    'tt1865718', 'tt0773262', 'tt3530232', 'tt5687612', 'tt0096657', 'tt0096697', 
    'tt0412142', 'tt3322312', 'tt4934214', 'tt4742876', 'tt0472954', 'tt4574334', 
    'tt1305826', 'tt0200276', 'tt0081834', 'tt0264235', 'tt0388629', 'tt0072500', 
    'tt3398228', 'tt1831164', 'tt6025022', 'tt0121955', 'tt1856010', 'tt2085059', 
    'tt4786824', 'tt2707408', 'tt0214341', 'tt0096548', 'tt2442560', 'tt5753856', 
  ];

  constructor(private http: HttpClient) {}

  getApiKey(): string {
    return this.apiKey;
  }

  searchResult(searchTerm: string): Observable<any> {
    const movieSearch$ = this.http.get<any>(
      `${this.apiUrl}?s=${searchTerm}&apikey=${this.apiKey}&plot=full&type=movie`
    );
    const seriesSearch$ = this.http.get<any>(
      `${this.apiUrl}?s=${searchTerm}&apikey=${this.apiKey}&plot=full&type=series`
    );

    return forkJoin([movieSearch$, seriesSearch$]).pipe(
      map(([movies, series]) => {
        const combinedResults = [...(movies.Search || []), ...(series.Search || [])];
        return { Search: combinedResults };
      })
    );
  }

  getMovieDetails(imdbID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?i=${imdbID}&apikey=${this.apiKey}&plot=full`);
  }

  getMoviesByIds(): Observable<any[]> {
    const movieRequests = this.movieIds.map((id) =>
      this.http.get<any>(`${this.apiUrl}?i=${id}&apikey=${this.apiKey}`)
    );
    return forkJoin(movieRequests).pipe(
      map((movies) => movies.sort((a, b) => a.Year.localeCompare(b.Year)))
    );
  }

  getSeriesByIds(): Observable<any[]> {
    const serieRequests = this.serieIds.map((id) =>
      this.http.get<any>(`${this.apiUrl}?i=${id}&apikey=${this.apiKey}`)
    );
    return forkJoin(serieRequests).pipe(
      map((series) => series.sort((a, b) => a.Year.localeCompare(b.Year)))
    );
  }

}