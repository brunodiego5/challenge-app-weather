import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Weather } from '../../models';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  weather: Weather;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        this.dashboardService.getWeatherGeo(latitude, longitude)
          .subscribe(weather => {
            this.weather = weather;
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
    this.dashboardService.getWeatherCity(this.weather?.city)
        .subscribe(weather => this.weather = weather);
  }
}
