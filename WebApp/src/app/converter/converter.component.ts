import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})

export class ConverterComponent implements OnInit {

  currenciesType =[{value: 1, name:'Euro'},{value: 2, name:'Dollar'}]
  private timer:any

  initialrate=1.1
  rate = 0
  currency=''
  currencyConverted=0
  currencySynchronized =1
  FirstcurrencyValue=''
  SecondtcurrencyValue=''
  currencySelected =''  
  rateInput=''

  constructor() { }

  ngOnInit(): void {
  this.timer=  timer(1,3000)
    .pipe()
    .subscribe(() => { 
     const valuetoAdd = randomNumber(-0.5,0.5)
     this.rate= Number((this.initialrate + valuetoAdd).toFixed(2))

     //L'euro converti en temps réel en euro (le polling)
     this.currencySynchronized = (this.currencySynchronized*this.rate)
    });
  }

  convertCurrencyToUSD(){
   this.currencyConverted = this.rate*Number(this.currency)
  }

 
  calculateCurrency(){
      this.SecondtcurrencyValue = this.currencySelected==='Euro'
      ? (this.rate*Number(this.FirstcurrencyValue)).toFixed(2).toString()
      : (Number(this.FirstcurrencyValue)/this.rate).toFixed(2).toString()
     
   }

   onChange(){
   if(this.FirstcurrencyValue!=''){
    let intermediaire=this.FirstcurrencyValue
    this.FirstcurrencyValue=this.SecondtcurrencyValue
    this.SecondtcurrencyValue=intermediaire

    this.FirstcurrencyValue = this.currencySelected==='Euro'
    ? (this.rate*Number(this.SecondtcurrencyValue)).toFixed(2).toString()
    :  (Number(this.SecondtcurrencyValue)/this.rate).toFixed(2).toString()
   }
   }

   fixRate(){
      this.rate=Number(this.rateInput)
      this.unsbscribeTimer()
   }
   ngOnDestroy() {
    this.unsbscribeTimer()
}
unsbscribeTimer():void{
  this.timer.unsubscribe()
}
}

function randomNumber(min:number, max:number) {
  return Math.random() * (max - min) + min;
}