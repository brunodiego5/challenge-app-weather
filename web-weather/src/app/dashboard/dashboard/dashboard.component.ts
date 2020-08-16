import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { Weather, City } from '../../models';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { from } from 'rxjs';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  searchControl: FormControl;
  faCrosshairs = faCrosshairs;

  weather: Weather = new Weather();
  city: City = new City();
  cities: City[] = [];
  loading = false;
  loadingCity = false;


  constructor(private dashboardService: DashboardService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getWeatherByGeo();

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

  getWeatherByGeo() {

    this.loading = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        this.dashboardService.getWeatherGeo(latitude, longitude)
          .subscribe(weather => {
            this.weather = weather;
            this.loading = false;
          });

      },
      (err) => {
        this.loading = false;
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }

  getWeatherByCityName(city) {
    this.loading = true;
    this.cities = [];
    this.searchControl.setValue('');
    if (city?.name != '') {
      this.dashboardService.getWeatherCity(city?.name)
        .subscribe(weather => {
          this.weather = weather
          this.loading = false;
        });
    }
  }

  isSearching() {
    return this.searchControl.value == '' ? false : true;
  }
}
