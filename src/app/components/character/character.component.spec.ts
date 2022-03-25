import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { PopulateService } from 'src/app/services/populate/populate.service';

import { CharacterComponent } from './character.component';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  
  const populateServiceSpy = jasmine.createSpyObj('PopulateService', ['getData']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterComponent ],
      imports:[
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers:[
        CookieService,
        { provide: PopulateService, useValue: populateServiceSpy }
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('populateCharacter', () => {
    it('Should set the initial data to start the app', () => {
      const response: any = [
        { id: '1', name: 'Kanye' },
        { id: '2', name: 'Mark' },
        { id: '3', name: 'Cristina' }
      ];

      populateServiceSpy.getData.and.returnValue(of(response));

      component.populateCharacter()

      expect(component.dataInitial).toEqual(response)

    })
  })

  describe('getPercentage', () =>{
    it('Should return the percentage for the values given', ()=> {
      const value = 45;
      const total = 100;

      const result = component.getPercentage(value, total)

      expect(result).toEqual('45.00')

    })
  })

  describe('getVotes', () => {
    let array:any;
    beforeAll( () => {
       array = [
        { id: '1', name: 'Kanye', votes: {positive: '23', negative: '50'} },
        { id: '2', name: 'Mark', votes: {positive: '13', negative: '78'} },
        { id: '3', name: 'Cristina', votes: {positive: '53', negative: '9'} }
      ]
    })

    it('Should return the amount of vote for a type positive ', () => {
      
      const id = '1'
      const type = 'positive';

      const result = component.getVotes(array, id, type)

      expect(result).toEqual('23')

    })

        
    it('Should return the amount of vote for a type positive ', () => {
      
      const id = '2'
      const type = 'negative';

      const result = component.getVotes(array, id, type)

      expect(result).toEqual('78')

    })
  })
});
