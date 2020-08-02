import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit{
  title = 'web-weather';

  city: any;
  cityName: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  getTemperature() {
    let params = new HttpParams();
    console.log('cityName', this.cityName);
    params = params.append('cityName', this.cityName);

    this.city = this.http.get<any>(`
        https://8000-c5e005ed-947f-4ddb-9c93-02665b59abde.ws-us02.gitpod.io/citys/`, {params})
        .subscribe(city => this.city = city);
  }
}
