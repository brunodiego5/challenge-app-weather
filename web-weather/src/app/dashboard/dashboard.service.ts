import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getWeatherByCityName(cityName: string) {
    let params = new HttpParams();

    params = params.append('cityName', cityName);

    return this.http.get<any>(`
        https://8000-a2965d77-2116-4a07-9c23-3b330807bc65.ws-us02.gitpod.io/citys/bycity/`, {params});
  }

  getWeatherByLatLon(lat: number, lon: number) {
    let params = new HttpParams();

    params = params.append('lat', lat.toString());
    params = params.append('lon', lon.toString());

    return this.http.get<any>(`
        https://8000-a2965d77-2116-4a07-9c23-3b330807bc65.ws-us02.gitpod.io/citys/bylatlon/`, {params});
  }

}
