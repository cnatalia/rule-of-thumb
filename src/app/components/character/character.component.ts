import { Component, Input, OnInit } from '@angular/core';
import { VotesResponse } from 'src/app/models/votes-response';
import { PopulateService } from 'src/app/services/populate/populate.service';
import { VotesService } from 'src/app/services/votes/votes.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  
  public votes:any[] = []
  public percentage: number = 0;


  @Input() name: string = "";
  @Input() description: string= "";
  @Input() category: string= "";
  @Input() picture: string= "";
  @Input() lastUpdated: string= "";
  @Input() view: string= "list";
  @Input() negative: number = 0;
  @Input() positive: number = 0;
  @Input() total: number = 0;
  @Input() id: string= "list";

  
  constructor( private populate : PopulateService) {
    //this.drawVotes()

   }

  ngOnInit(): void {
 
  }

  public drawPercentage(value: number, total: number){
    return Number( ((100 * value) / total).toFixed(2))
  
  }

  getPercentage(value: number, total: number){

    return ((100 * value) / total).toFixed(2)
  }


  
}
