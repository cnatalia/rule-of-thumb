import { Component, Input, OnInit } from '@angular/core';
import { PopulateService } from 'src/app/services/populate/populate.service';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  public form;
  public dataInitial: any;
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

    this._negative = this.cookies.get('data') ? this.getVotes(JSON.parse(this.cookies.get('data')), this.id, 'negative') : this.negative
    this._positive = this.cookies.get('data') ? this.getVotes(JSON.parse(this.cookies.get('data')), this.id, 'positive') : this.positive
    this._total = this._negative + this._positive
    this.percPositivo = this.getPercentage(this._positive, this._total)
    this.percNegativo = this.getPercentage(this._negative, this._total)
  }

  public populateCharacter() {

    this.populate.getData().subscribe(data => {
      this.dataInitial = data
    })

  }

  getVotes(array:any, id: any, type: string): any {
    let aux;
    
    array.map(
      (value: any) => {
        value.id === id ? aux = value.votes[type] : ''
      })

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
      this.dataInitial = this.cookies.get('data') ? JSON.parse(this.cookies.get('data')) : data

      dataUpdate = this.dataInitial.map((p: any) =>
        p.id === characterID
          ? {
            ...p,
            lastUpdated: moment().format(),
            votes: { ...p.votes, [type]: p.votes[type] + 1 },
            total: p.total + 1
          }
          : p
      );


      this.cookies.set('data', JSON.stringify(dataUpdate))
      this._lastUpdated = this.setLastUpdate(dataUpdate, characterID)
      this._negative = this.cookies.get('data') ? this.getVotes(JSON.parse(this.cookies.get('data')), this.id, 'negative') : this.negative
      this._positive = this.cookies.get('data') ? this.getVotes(JSON.parse(this.cookies.get('data')), this.id, 'positive') : this.positive
      this.percPositivo = this.getPercentage(this._positive, this._total)
      this.percNegativo = this.getPercentage(this._negative, this._total)
    })

  }

  public setLastUpdate(array: any, id: any) {
    let aux = array.find((data: any) => data.id === id)?.lastUpdated
    return moment(aux).fromNow();

  }

  public changeState(id: string, state: string) {

    let formId = "votes_" + id
    let form = document.getElementById(formId)

    form!.className = state === 'vote' ? "character__right character__form--again" : "character__right character__form--new";

  }



}
