import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  provName;
  myUrl : string = 'http://api.openweathermap.org/data/2.5/forecast';
  myApiKey : string = 'c78a2cfa0d45c827a8e94780a75d423a';
  currentProv: any = [];
  infos: any;

  constructor(public route: ActivatedRoute, public http: HttpClient) { 
    this.provName = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getWeatherDetail();
  }

  // chiamata api per dettaglio provincia
  
  getWeatherDetail() : void {
    this.http.get(this.myUrl+'?q='+this.provName+'&appid='+this.myApiKey+'&lang=it&units=metric').subscribe(res => {
      this.currentProv.push(res);
      this.infos = this.currentProv[0];
      console.log(this.infos);
    })
  }
  

}