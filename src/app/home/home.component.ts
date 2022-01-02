import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import provinces from '../data/provinces.json';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lat:any;
  lon:any;
  name:any;
  searchResults: any = [];
  inputCity:string = '';
  loading:boolean=false;
  currentPositionArray : any = [];
  positionResult : any;
  searchAppear : boolean = false;
  responseList: any = [];
  provincesList:any=provinces;
  myUrl : string = 'http://api.openweathermap.org/data/2.5/';
  myProvName : string = '';
  myApiKey : string = 'c78a2cfa0d45c827a8e94780a75d423a';

  constructor(public route: ActivatedRoute, public http: HttpClient) {
  }

  ngOnInit(): void {
    this.getWeatherAll();
  }

  // chiamata api per la lista delle province nella home
  getWeatherAll(){
    this.loading=true;
    for (let i = 0; i < this.provincesList.length; i++) {
      this.lat = this.provincesList[i]['lat'];
      this.lon = this.provincesList[i]['lon'];
      this.http.get(this.myUrl+'weather?lat='+this.lat+'&lon='+this.lon+'&appid='+this.myApiKey+'&lang=it&units=metric').subscribe(res => {
          console.log(res);
          this.responseList.push(res);
          this.loading=false;
      })
    }
    console.log(this.responseList);
  }

  // chiamata per fare ricerca (work in progress)

  getInput(val:string) :void{
    this.searchAppear = true;
    this.inputCity=val;
    console.log(this.inputCity);
    this.http.get(this.myUrl+'find?q='+this.inputCity+'&appid='+this.myApiKey+'&lang=it&units=metric').subscribe(res => {
      console.log(res);
      this.searchResults.push(res);
      console.log(this.searchResults);
    })
  }

  //  ottengo la posizione

  getPosition(){
    if(!navigator.geolocation){
      console.log('loc not supp');  
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      this.http.get(this.myUrl+'weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid='+this.myApiKey+'&lang=it&units=metric').subscribe(res => {
        this.currentPositionArray.push(res);
        this.positionResult = this.currentPositionArray[0];
        console.log(this.positionResult.name);
      })
    })
  }
  
  searchDisappear() {
    this.searchAppear = false;
  }

}
