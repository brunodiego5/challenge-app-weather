import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { Weather, City } from '../../models';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  searchControl: FormControl;

  weather: Weather = new Weather();
  cities: City[];

  constructor(private dashboardService: DashboardService,
              private fb: FormBuilder) { }

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

    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchTerm =>
          this.dashboardService.getCitiesByName(searchTerm)
          .pipe(catchError(error => from([]))))
      ).subscribe(cities => this.cities = cities);
  }

  getWeatherByCityName() {
    this.dashboardService.getWeatherCity(this.weather?.city)
        .subscribe(weather => this.weather = weather);
  }
}
