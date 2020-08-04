import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  city: any;
  cityName: string = "guararapes";
  latitude: number = 0;
  longitude: number = 0;


  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.latitude = latitude;
            this.longitude = longitude;

            console.log('latitude: ', this.latitude);
            console.log('longitude: ', this.longitude);

            this.dashboardService.getWeatherByLatLon(this.latitude, this.longitude)
              .subscribe(city => {
                  this.city = city;
                  this.cityName = city?.name;
                });

          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000,
          }
        );


  }

  getWeatherByCityName() {
    this.dashboardService.getWeatherByCityName(this.cityName)
        .subscribe(city => this.city = city);
  }

}
