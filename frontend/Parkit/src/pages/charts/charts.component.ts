import { Component } from '@angular/core';
import { Chart } from 'ng2-chartjs2';
 import { ChartsService } from './chartsService/charts.service';
import { Headers } from '@angular/http';

@Component({
  selector: 'chartComponent',
  templateUrl: './charts.component.html',
  providers: [ChartsService]
})
export class ChartComponent {
	//needs service to be read in from API
	getDataTry:any;
  percentFull: number;
	constructor(public chartService: ChartsService){
		// this.getDataTry= ChartsService.makeGetRequest();
  }
  loadData(parkingLot : string, headers : Headers ){
    this.chartService.load(parkingLot, headers)
      .then(data=>{
        this.percentFull=data['percentFull'];
        console.log(this.percentFull);
      })
		.catch(data => alert(data.json().error));
  }
  doughnutLabels: string[] = ["Full","Empty"];
  doughnutData: Chart.Dataset[] = [
    {
      label: '# of Cars',
      data: [this.percentFull,100-this.percentFull],
      backgroundColor: [
        'red',
        'rgba(0,255,0,100)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    }
  ];
  barLabels: string[] = ["9AM","10AM","11AM","12PM","1PM","2PM"];
  barData: Chart.Dataset[] = [
    {
      label: 'Busiest hours',
      data: [100,120,150,200,150,120],
      borderWidth: 1
    }
  ];
}