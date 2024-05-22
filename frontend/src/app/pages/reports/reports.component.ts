import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportsService } from '../../services/reports.service';
import { Observable, lastValueFrom } from 'rxjs';
import { AdditionalSalesInfo, Sales, simpleChartInfo } from '../../interfaces/reports';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faCircle as faFullCircle} from '@fortawesome/free-solid-svg-icons';
import {faCircle as faEmptyCircle} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [NgxChartsModule, NavbarComponent, FontAwesomeModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  //icons
  fullCircleIcon = faFullCircle
  emptyCircleIcon = faEmptyCircle

  //charts attributes
  salesChartSize: [number, number] = [1000, 400];
  bestSellersChartSize: [number, number] = [1000, 400];
  categoriesChartSize: [number, number] = [1000, 400];
  usersChartSize: [number, number] = [1000, 400];
  results: Array<any> = []

  // options line chart
  SalesXAxisLabel: string = 'Month'; 
  SalesYAxisLabel: string = 'Sales (USD)'; 

  // options pie chart simple
  legendPosition = 'right';

  single1 = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    }
  ];

  single2 = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];

  // multi = [
  //   {
  //     "name": "Sales",
  //     "series": [
  //       {
  //         "name": '1990',
  //         "value": 62000000,
  //       },
  //       {
  //         "name": "2010",
  //         "value": 73000000,
  //       },
  //       {
  //         "name": "2011",
  //         "value": 89400000,
  //       }
  //     ]
  //   } 
  // ];

  salesData: Array<Sales> = []
  addtionalSalesData = {} as AdditionalSalesInfo
  bestSellersData: Array<simpleChartInfo> = []
  categoriesData: Array<simpleChartInfo> = []
  usersData: Array<simpleChartInfo> = []
  yearlyIcon = this.emptyCircleIcon
  monthlyIcon = this.emptyCircleIcon
  dailyIcon = this.emptyCircleIcon
  hourlyIcon = this.emptyCircleIcon

  constructor(private _reportsService: ReportsService) {
    Object.assign(this, { single: this.single1 });
    this.monthlyIcon = this.fullCircleIcon
  }

  ngOnInit(){
    this.getChartsData()
  }

  async getChartsData(){
    let res = await lastValueFrom (this.getSales('monthly'))
    this.salesData = res.salesData
    this.addtionalSalesData = res.additionalSalesData
    res = await lastValueFrom (this.getBestSellers())
    this.bestSellersData = res
    res = await lastValueFrom (this.getNumProductsByCategory())
    this.categoriesData = res
    res = await lastValueFrom (this.getRegisteredUsers())
    this.usersData = res
  }

  getSales(timeLapse: string) {
    return new Observable<any>((observer) => {
      this._reportsService.getSales(timeLapse).subscribe({
        next: (res) => {
            observer.next(res); 
            observer.complete();  
        }, error: (error) => {
            observer.error(error);
        }
      });
    });
  }

  getBestSellers(){
    return new Observable<any>((observer) => {
      this._reportsService.getBestSellers().subscribe({
        next: (res) => {
            observer.next(res); 
            observer.complete();  
        }, error: (error) => {
            observer.error(error);
        }
      });
    });
  }

  getNumProductsByCategory(){
    return new Observable<any>((observer) => {
      this._reportsService.getNumProductsByCategory().subscribe({
        next: (res) => {
            observer.next(res); 
            observer.complete();  
        }, error: (error) => {
            observer.error(error);
        }
      });
    });
  }

  getRegisteredUsers(){
    return new Observable<any>((observer) => {
      this._reportsService.getRegisteredUsers().subscribe({
        next: (res) => {
            observer.next(res); 
            observer.complete();  
        }, error: (error) => {
            observer.error(error);
        }
      });
    });
  }

  onSelect(data: any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  // selectFilter(iconId: string){
  //   const clickedTag = document.getElementById(iconId) as HTMLElement
  //   const noSelectedIcon = clickedTag?.getAttribute('ng-reflect-icon')!
  //   const selectedTag = document.getElementsByClassName('selected')[0] as HTMLElement
  //   const selectedIcon = selectedTag?.getAttribute('ng-reflect-icon')!
  //   console.log(selectedIcon)
  //   clickedTag?.setAttribute('ng-reflect-icon', selectedIcon)
  //   clickedTag?.classList.add('selected')
  //   selectedTag.setAttribute('ng-reflect-icon', noSelectedIcon)
  // }

  selectFilter(iconId: string){
    const currentFilter = document.getElementsByClassName('selected')[0]
    const clickedFilter = document.getElementById(iconId)
    const currentFilterId = currentFilter.getAttribute('id')!
    currentFilter.classList.remove('selected')
    clickedFilter?.classList.add('selected')
    this.toggleFilter(currentFilterId)
    this.toggleFilter(iconId)
  }

  async toggleFilter(iconId: string){
    let res
    switch (iconId) {
      case 'yearly':
        if (this.yearlyIcon === this.emptyCircleIcon)
          this.yearlyIcon = this.fullCircleIcon
        else
          this.yearlyIcon = this.emptyCircleIcon
        this.SalesXAxisLabel = 'Year'
        break;
      case 'monthly':
        if (this.monthlyIcon === this.emptyCircleIcon)
          this.monthlyIcon = this.fullCircleIcon
        else
          this.monthlyIcon= this.emptyCircleIcon
        this.SalesXAxisLabel = 'Year-Month'
        break;
      case 'daily':
        if (this.dailyIcon === this.emptyCircleIcon)
          this.dailyIcon = this.fullCircleIcon
        else
          this.dailyIcon = this.emptyCircleIcon
        this.SalesXAxisLabel = 'Month-Day'
        break;
      case 'hourly':
        if (this.hourlyIcon === this.emptyCircleIcon)
          this.hourlyIcon = this.fullCircleIcon
        else
          this.hourlyIcon = this.emptyCircleIcon
        this.SalesXAxisLabel = 'Day-Hour'
        break;
      default:
        console.log(`error selecting sales chart filter`);
    }
    res = await lastValueFrom (this.getSales(iconId))
    this.salesData = res.salesData
    this.addtionalSalesData = res.additionalSalesData
  }

}
