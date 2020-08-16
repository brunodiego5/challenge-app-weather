import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  //api = 'http://127.0.0.1:8000/';
  api = 'https://8000-e8417229-3bb6-4f12-b904-a5c640402a3c.ws-us02.gitpod.io/';


  constructor(private http: HttpClient) { }

  getWeatherCity(name: string) {
    let params = new HttpParams();

    params = params.append('name', name);

    return this.http.get<any>(`
        ${this.api}weather/city`, {params});
  }

  getWeatherGeo(lat: number, lon: number) {
    let params = new HttpParams();

    params = params.append('lat', lat.toString());
    params = params.append('lon', lon.toString());

    return this.http.get<any>(`
    ${this.api}weather/geo`, {params});
  }

  getCityById(id: number) {
    return this.http.get<any>(`
        ${this.api}cities/${id}`);
  }

  getCitiesByName(name: string):Observable<City[]> {
    let params = new HttpParams();

    params = params.append('name', name);
    return this.http.get<City[]>(`
        ${this.api}cities`, {params});
  }


}
