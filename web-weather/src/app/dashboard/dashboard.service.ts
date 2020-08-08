import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  //api = 'http://127.0.0.1:8000/';
  api = 'https://8000-d78d79d0-5c30-4e66-ba44-35d767daeab2.ws-us02.gitpod.io/';

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

}
