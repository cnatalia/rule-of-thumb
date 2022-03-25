import { Component, Input, OnInit } from '@angular/core';
import { VotesResponse } from 'src/app/models/votes-response';
import { PopulateService } from 'src/app/services/populate/populate.service';
import { VotesService } from 'src/app/services/votes/votes.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { find, of } from 'rxjs';
import * as Moment from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  public votes: any[] = []
  public percentage: number = 0;
  public form;
  public dataInitial: any;
  public hasVoted: boolean = false;
  public _lastUpdated: any;
  public _positive: any;
  public _negative: any;
  public percPositivo: any;
  public percNegativo: any;
  public _total: any;

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
    private formBuilder: FormBuilder,
    private cookies: CookieService
  ) {

    this.form = this.formBuilder.group({
      vote: ''
    });

  }

  ngOnInit(): void {
    this._lastUpdated = this.cookies.get('data') ? this.setLastUpdate(JSON.parse(this.cookies.get('data')), this.id) : moment(this.lastUpdated).startOf('day').fromNow()
    //console.log(auxpo)
    
    this._negative = this.cookies.get('data') ? this.getVotes(JSON.parse(this.cookies.get('data')), this.id, 'negative') : this.negative
    this._positive = this.cookies.get('data') ? this.getVotes(JSON.parse(this.cookies.get('data')), this.id, 'positive') : this.positive
    this._total = this._negative + this._positive
    this.percPositivo=  this.getPercentage(this._positive, this._total)
    this.percNegativo=  this.getPercentage(this._negative, this._total)
    console.log(this._negative)
  }

  public populateCharacter() {

    this.populate.getData().subscribe(data => {

      this.dataInitial = data
      //this.cookies.set('data', JSON.stringify(this.characteres));
    })

  }

  public drawPercentage(value: number, total: number) {
    return Number(((100 * value) / total).toFixed(2))

  }



  getVotes(array:any, id:any, type:string) {
    let aux ;
    array.map(
      (value:any) =>{
         value.id === id ? aux = value.votes[type] : ''
    } )
  
    return aux;
   
  }

  getPercentage(value: number, total: number) {

    return ((100 * value) / total).toFixed(2)
  }

  onSubmit(value: any, id: string) {
    this.changeState(id, 'vote')
    this.setVote(Number(id), value.vote)
  }

  voteAgain(id: string) {
    this.changeState(id, 'again')
  }

  public setVote(characterID: number, type: string) {

    this.populate.getData().subscribe(data => {
      let dataUpdate;
      let idTime = "time_" + characterID;
      let time = document.getElementById(idTime)

      this.dataInitial = this.cookies.get('data') ? JSON.parse(this.cookies.get('data')) : data

      if (type === 'positive') {
        dataUpdate = this.dataInitial.map((p: any) =>
          p.id === characterID
            ? {
              ...p,
              lastUpdated: moment().format(),
              votes: { ...p.votes, positive: p.votes.positive + 1 },
              total: p.total + 1
            }
            : p
        );
      } else {
        dataUpdate = this.dataInitial.map((p: any) =>
          p.id === characterID
            ? {
              ...p,
              lastUpdated: moment().format(),
              votes: { ...p.votes, negative: p.votes.negative + 1 },
              total: p.total + 1
            }
            : p
        );
      }
      console.log(dataUpdate)

      this.cookies.set('data', JSON.stringify(dataUpdate))
      this._lastUpdated = this.setLastUpdate(dataUpdate, characterID)
      this._negative = this.cookies.get('data') ? this.getVotes(JSON.parse(this.cookies.get('data')), this.id, 'negative') : this.negative
      this._positive = this.cookies.get('data') ? this.getVotes(JSON.parse(this.cookies.get('data')), this.id, 'positive') : this.positive
      this.percPositivo=  this.getPercentage(this._positive, this._total)
      this.percNegativo=  this.getPercentage(this._negative, this._total)
    })

  }

  public setLastUpdate(array: any, id: any) {
;
    let aux = array.find((data: any) => data.id === id)?.lastUpdated


    return moment(aux).fromNow();

  }

  public changeState(id: string, state: string) {
  
    let formId = "votes_" + id
    let form = document.getElementById(formId)

    form!.className = state === 'vote' ? "character__right character__form--again" : "character__right character__form--new";

  }



}
