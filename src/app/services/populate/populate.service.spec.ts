
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PopulateService } from './populate.service';

describe('PopulateService', () => {
  let service: PopulateService;
  let httpClient: HttpClient;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopulateService],
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClient = TestBed.get(HttpClient);

    service = new PopulateService(httpClient)

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getData', () => {
    it('should get the financial data', () => {


      const response: any = {
        'code': '0',
        'message': 'SUCCESS-0: Transaction realized successfully',
        'details': {}
      };

      service.getData().subscribe((res) => {
        expect(res).toEqual(response);
      });

    });
  });
});

