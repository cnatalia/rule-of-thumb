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
  public dataInitial:any;
  public hasVoted:boolean = false;
  public _lastUpdated:any;

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
    this._lastUpdated = this.cookies.get('data') ? this.setLastUpdate(JSON.parse(this.cookies.get('data')), this.id ): moment(this.lastUpdated).startOf('day').fromNow()

  }

  public populateCharacter(){

    this.populate.getData().subscribe( data =>  {
     
      this.dataInitial = data
      //this.cookies.set('data', JSON.stringify(this.characteres));
    })

  }

  public drawPercentage(value: number, total: number) {
    return Number(((100 * value) / total).toFixed(2))

  }

  getPercentage(value: number, total: number) {

    return ((100 * value) / total).toFixed(2)
  }

  onSubmit(value: any, id: string) {
    console.log(value.vote, id)
    this.changeState(id, 'vote')
    this.setVote( Number(id), value.vote)
  }

  voteAgain(id:string){
    this.changeState(id, 'again')
  }

  public setVote(characterID:number, type:string) {
   
    this.populate.getData().subscribe( data =>  {
      let dataUpdate;
      let idTime = "time_" + characterID;
      let time = document.getElementById(idTime)

      this.dataInitial = this.cookies.get('data') ? JSON.parse(this.cookies.get('data')) : data

      if(type==='positive'){
        dataUpdate = this.dataInitial.map((p:any) =>
        p.id === characterID 
           ? { ...p, 
            lastUpdated:moment().format(),
            votes: {...p.votes, positive: p.votes.positive+1}, 
            total: p.total+1 }
           : p
       );
      }else{
        dataUpdate = this.dataInitial.map((p:any) =>
        p.id === characterID 
           ? { ...p, 
            lastUpdated:moment().format(),
            votes: {...p.votes, negative: p.votes.negative+1}, 
            total: p.total+1 }
           : p
       );
      }
      console.log(dataUpdate)

     this.cookies.set('data',JSON.stringify(dataUpdate))
     this._lastUpdated = this.setLastUpdate(dataUpdate, characterID)

    })

  }

  public setLastUpdate(array:any, id: any){
    // var nacimiento=moment("2010-01-03");
    // var hoy=moment();
    // var anios=hoy.diff(nacimiento,"years");
let aux = array.find((data:any) => data.id === id)?.lastUpdated


    return moment(aux).fromNow();

  }

  public changeState(id: string, state:string) {
    let idButton = "button_" + id;
    let idButtonAgain = "button_again_" + id;
    let button = document.getElementById(idButton)
    let buttonAgain = document.getElementById(idButtonAgain)
    let idRadioP = "positiveLabel_" + id;
    let idRadioN = "negativeLabel_" + id;

    let idTime = "time_" + id;
    let idTimeAgain = "time_again_" + id;

    let positiveVote = document.getElementById(idRadioP)
    let negativeVote = document.getElementById(idRadioN)
    let time = document.getElementById(idTime)
    let timeAgain = document.getElementById(idTimeAgain)

    if (state === 'vote') {

      positiveVote!.style.display = 'none'
      negativeVote!.style.display = 'none'
      button!.style.display = 'none'
      buttonAgain!.style.display = 'inline-block'
      timeAgain!.style.display = 'inline-block'
      time!.style.display = 'none'
    } else {

      positiveVote!.style.display = 'inline-block'
      negativeVote!.style.display = 'inline-block'
      buttonAgain!.style.display = 'none'
      button!.style.display = 'inline-block'
      time!.style.display = 'inline-block'
      timeAgain!.style.display = 'none'
    }



  }



}
