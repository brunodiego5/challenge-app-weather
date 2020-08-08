import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'dart:convert' as convert;
import 'package:http/http.dart' as http;
import 'package:geolocator/geolocator.dart' as geo;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Weather App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  //var api = '10.0.2.2:8000';
  //var api = '192.168.1.101:8000';
  //var api = 'http://127.0.0.1:8000/';
  var api = '8000-d78d79d0-5c30-4e66-ba44-35d767daeab2.ws-us02.gitpod.io';
  var city;
  var temperature;
  var description;
  var currently;
  var date;
  var uri;

  Future getWeatherCity(city) async {
    var query = {"name": city.toString()};
    //var uri = Uri.http(api, '/weather/city', query);
    var uri = Uri.https(api, '/weather/city', query);

    var response = await http.get(uri);
    var results = convert.jsonDecode(response.body);

    setState(() {
      this.city = results['city'];
      this.temperature = results['temperature'];
      this.description = results['description'];
      this.currently = results['currently'];
      this.date = results['date'];
    });
  }

  Future getWeatherGeo(lat, lon) async {
    var query = {"lat": lat.toString(), "lon": lon.toString()};
    //var uri = Uri.http(api, '/weather/geo', query);
    var uri = Uri.https(api, '/weather/geo', query);

    var response = await http.get(uri);
    var results = convert.jsonDecode(response.body);
    setState(() {
      this.city = results['city'];
      this.temperature = results['temperature'];
      this.description = results['description'];
      this.currently = results['currently'];
      this.date = results['date'];
    });
  }

  Future<geo.Position> getPosition() async {
    geo.Geolocator geolocator = geo.Geolocator()
      ..forceAndroidLocationManager = true;
    geo.GeolocationStatus geolocationStatus =
        await geolocator.checkGeolocationPermissionStatus();

    geo.Position position = await geolocator.getCurrentPosition(
        desiredAccuracy: geo.LocationAccuracy.high);
    return position;
  }

  @override
  void initState() {
    super.initState();
    this.getWeatherCity("guararapes");

    var position = this.getPosition();
    position
        .then((p) => this.getWeatherGeo(p.latitude, p.longitude))
        .catchError((e) {
      print(e);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: Colors.blue,
        height: MediaQuery.of(context).size.height,
        width: MediaQuery.of(context).size.width,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.only(bottom: 10.0, top: 10.0),
              child: Text(
                city != null ? city.toString() : "Loading",
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 14.0,
                    fontWeight: FontWeight.w600),
              ),
            ),
            Text(
              temperature != null
                  ? temperature.toString() + "\u00B0"
                  : "Loading",
              style: TextStyle(
                  color: Colors.white,
                  fontSize: 40.0,
                  fontWeight: FontWeight.w600),
            ),
            Padding(
              padding: EdgeInsets.only(bottom: 10.0),
              child: Text(
                currently != null ? currently.toString() : "Loading",
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 14.0,
                    fontWeight: FontWeight.w600),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(bottom: 10.0),
              child: Text(
                description != null ? description.toString() : "Loading",
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 14.0,
                    fontWeight: FontWeight.w600),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
