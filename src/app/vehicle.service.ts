import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getDetails(reg1,reg2):Observable<any>{
   return this.http.get('http://18.212.242.209/getVehicleDetails?reg1='+reg1+'&reg2='+reg2)
  }
}
