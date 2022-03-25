import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { VotesResponse } from 'src/app/models/votes-response';
import { PopulateService } from 'src/app/services/populate/populate.service';
import { VotesService } from 'src/app/services/votes/votes.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})

export class CoreComponent implements OnInit {
  public characteres:any;
  public options = [{id:'list', value:'List'},{id:'grid', value:'Grid'} ]
  public view: string = 'list'
  //public votes:VotesResponse[] = []

  constructor(
    private populate : PopulateService,
    private votesService: VotesService,
    private cookies: CookieService
  ) {
    this.populateCharacter()
    //this.drawVotes()
   }

  ngOnInit(): void {
    
  }
 
  public populateCharacter(){

    this.populate.getData().subscribe( data =>  {
     
      this.characteres = data
      this.cookies.set('data',JSON.stringify(this.characteres));
      
    })

  }

  public processSelected(event:any, id:string){
    console.log(event.id)
    this.view = event.id
    
  }

  // public drawVotes(){
  //   this.populate.getVotes().subscribe(data => {
  //     this.votes = data;
  //     console.log(this.votes)
  //   })
  // }


 
}
