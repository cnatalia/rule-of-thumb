import { Component, OnInit } from '@angular/core';
import { PopulateService } from 'src/app/services/populate/populate.service';


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})

export class CoreComponent implements OnInit {
  public characteres:any;
  public options = [{id:'list', value:'List'},{id:'grid', value:'Grid'} ]
  public view: string = 'list'


  constructor(
    private populate : PopulateService
  ) {
    this.populateCharacter()
 
   }

  ngOnInit(): void {
    
  }
 
  public populateCharacter(){

    this.populate.getData().subscribe( data =>  {
      this.characteres = data
    })

  }

  public processSelected(event:any, id:string){
    this.view = event.id
  }

 
}
