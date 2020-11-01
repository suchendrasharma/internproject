import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service'
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: VehicleService, private fb: FormBuilder) { }

  vehicleForm = this.fb.group({
    vehcile_no:['']
  })

  isLoading=false;
  isdetails=false;
  details:any;
  noData = false;

  ngOnInit(): void {
  }

  onSubmit(){
    this.isLoading=true;
    var str = this.vehicleForm.value.vehcile_no.toString();
    str=str.toLowerCase();
    var l= str.length;
    l=l-4;
    var res = str.slice(0, l);
    var res2 = str.slice(l);
    this.service.getDetails(res,res2).subscribe(
      (res)=>{
        if(res.chassis_no == null){
          this.noData=true;
        }
        else{
          this.noData=false;
// maker-model-start
          let x = res.maker___model.indexOf('/')
          str=res.maker___model;
          this.details=res;
          this.details.maker=str.slice(0,x)
          this.details.model=str.slice(x+1)
// maker-model-end 
          console.log(res);
          this.isdetails=true;
        }        
        this.isLoading=false;
      },(err)=>{
        window.alert(err);
        this.isLoading=false;
      }
    )
  }

}
