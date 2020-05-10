import { TestBed } from '@angular/core/testing';

import { GroceryService } from './grocery.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GroceryService', () => {
  let service: GroceryService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const sampleGrocery={
    id:1,
    name:"Apple",
    description:"Description",
    unitPrice:1,
    quantity:1,
    manufacturedDate:new Date(),
    expiryDate:new Date()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GroceryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all groceries',()=>{
    const testResp=[sampleGrocery];

    service.getAll().subscribe(res=>{
      expect(res.length).toBe(1);
      expect(res[0].name).toBe("Apple");
    });
    const req = httpTestingController.expectOne('/api/groceries');
    expect(req.request.method).toEqual('GET');
    req.flush(testResp);
  })

  
  it('should get single grocery',()=>{
    const testResp=sampleGrocery;

    service.get(1).subscribe(res=>{
      expect(res.name).toBe("Apple");
    });
    const req = httpTestingController.expectOne('/api/groceries/1');
    expect(req.request.method).toEqual('GET');
    req.flush(testResp);
  })

  it('should save a grocery',()=>{

    service.save(sampleGrocery).subscribe(res=>{
      expect(res.id).toBe(100);
    });
    const req = httpTestingController.expectOne('/api/groceries');
    expect(req.request.method).toEqual('POST');
    req.flush({id:100});
  })

  it('should delete a grocery',()=>{

    service.delete(1).subscribe(res=>{
      expect(res).toBeTruthy();
    });
    const req = httpTestingController.expectOne('/api/groceries/1');
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  })

  it('should edit a grocery',()=>{
    const testEntity = Object.assign({},sampleGrocery)
    testEntity.name="NewName";
    service.edit(testEntity).subscribe(res=>{
      expect(res).toBeTruthy();
      expect(res.name).toBe("NewName");
    });
    const req = httpTestingController.expectOne('/api/groceries');
    expect(req.request.method).toEqual('PUT');
    req.flush(testEntity)
  })


  afterEach(() => {
    httpTestingController.verify();
  });
});
