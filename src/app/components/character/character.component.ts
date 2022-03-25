import { Component, Input, OnInit } from '@angular/core';
import { VotesResponse } from 'src/app/models/votes-response';
import { PopulateService } from 'src/app/services/populate/populate.service';
import { VotesService } from 'src/app/services/votes/votes.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  public votes: any[] = []
  public percentage: number = 0;
  public form;

  @Input() name: string = "";
  @Input() description: string = "";
  @Input() category: string = "";
  @Input() picture: string = "";
  @Input() lastUpdated: string = "";
  @Input() view: string = "list";
  @Input() negative: number = 0;
  @Input() positive: number = 0;
  @Input() total: number = 0;
  @Input() id: string = "list";


  constructor(
    private populate: PopulateService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      vote: ''
    });

  }

  ngOnInit(): void {

  }

  public drawPercentage(value: number, total: number) {
    return Number(((100 * value) / total).toFixed(2))

  }

  getPercentage(value: number, total: number) {

    return ((100 * value) / total).toFixed(2)
  }

  onSubmit(value: any, id: string) {
    console.log(value.vote, id)
    this.changeState(id)

  }

  public changeState(id: string) {
    let idButton = "button_" + id;
    let button = document.getElementById(idButton)
    let idRadioP = "positiveLabel_" + id;
    let idRadioN = "negativeLabel_" + id;
    
    let idTime = "time_"+ id;

    let positiveVote = document.getElementById(idRadioP)
    let negativeVote = document.getElementById(idRadioN)
    
    let time = document.getElementById(idTime)
    if(button?.innerText === 'Vote Now'){
      
      positiveVote!.style.display = 'none'
      negativeVote!.style.display = 'none'
      button!.innerHTML = 'Vote Again'
      time!.innerHTML = 'Thank you for your vote!'
    }else{
  
      positiveVote!.style.display = 'inline-block'
      negativeVote!.style.display = 'inline-block'
      button!.innerHTML = 'Vote Now'
      time!.innerHTML = 'text'
    }
    


  }



}
