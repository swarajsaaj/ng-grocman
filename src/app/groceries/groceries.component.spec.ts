import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceriesComponent } from './groceries.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('GroceriesComponent', () => {
  let component: GroceriesComponent;
  let fixture: ComponentFixture<GroceriesComponent>;
  let router:Router;
  let httpClient:HttpClient;
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceriesComponent],
      imports:[RouterTestingModule.withRoutes([]),
      NgbModule,FontAwesomeModule,HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    router.initialNavigation();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all gorceries on startup',()=>{
    const req = httpTestingController.expectOne('/api/groceries');
    expect(req.request.method).toEqual('GET');
    req.flush([sampleGrocery]);
    expect(component.groceries).toEqual([sampleGrocery]);
  })

  it('should navigate on event',()=>{
    spyOn(router,'navigate');
    component.grocerySelected(sampleGrocery);
    expect(router.navigate).toHaveBeenCalledWith(['/view',sampleGrocery.id]);
  })

});
