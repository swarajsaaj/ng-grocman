import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { GroceryEditorComponent } from './grocery-editor.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorMode } from './grocery-editor-mode.enum';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const sampleGrocery={
  id:1,
  name:"Apple",
  description:"Description",
  unitPrice:1,
  quantity:1,
  manufacturedDate:"2020-01-01",
  expiryDate:"2020-01-01"
};

describe('GroceryEditorComponent', () => {
  let component: GroceryEditorComponent;
  let fixture: ComponentFixture<GroceryEditorComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryEditorComponent ],
      imports: [ HttpClientTestingModule,RouterTestingModule.withRoutes([]),
      NgbModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});


describe('GroceryEditorComponent - Add Mode', () => {
  let component: GroceryEditorComponent;
  let fixture: ComponentFixture<GroceryEditorComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryEditorComponent ],
      imports: [ HttpClientTestingModule,RouterTestingModule.withRoutes([]),
      NgbModule]
    });
      
    TestBed.overrideProvider(ActivatedRoute,{useValue:{
      url:new Observable(sub=>{
        sub.next([{'path':'add'}]);
      })
    }});

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should render add page', () => {
      expect(component.mode).toEqual(EditorMode.ADD);
      expect(component.operation).toEqual("Add Grocery")
  });

  it('should not show delete,edit buttons',()=>{
      expect(fixture.nativeElement.querySelector("#deleteBtn")).toBeNull();
      expect(fixture.nativeElement.querySelector("#editBtn")).toBeNull();
  })

});



describe('GroceryEditorComponent - Edit Mode', () => {
  let component: GroceryEditorComponent;
  let fixture: ComponentFixture<GroceryEditorComponent>;
  let router: Router;
  
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryEditorComponent ],
      imports: [ HttpClientTestingModule,RouterTestingModule.withRoutes([]),
      NgbModule]
    });
      
    TestBed.overrideProvider(ActivatedRoute,{useValue:{
      url:new Observable(sub=>{
        sub.next([{'path':'edit'},{'path':1}]);
      })
    }});

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    router.initialNavigation();
    
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should render edit page', () => {
      expect(component.mode).toEqual(EditorMode.EDIT);
      expect(component.operation).toEqual("Edit Grocery")
  });

  it('should show delete button',()=>{
      expect(fixture.nativeElement.querySelector("#deleteBtn")).toBeTruthy();
  })

  it('should submit form',()=>{
    
    const req = httpTestingController.expectOne("/api/groceries/1");
    expect(req.request.method).toEqual('GET');
    req.flush(Object.assign({},sampleGrocery));

    component.submit();

    const navSpy = spyOn(router,'navigate');
    const req2 = httpTestingController.expectOne("/api/groceries");
    expect(req2.request.method).toEqual('PUT');
    req2.flush(Object.assign({},sampleGrocery));
    expect(router.navigate).toHaveBeenCalledWith(['/'])
  })

      
  it('should handle submit failure',()=>{
    
    const req = httpTestingController.expectOne("/api/groceries/1");
    expect(req.request.method).toEqual('GET');
    req.flush(Object.assign({},sampleGrocery));

    component.submit();
    
    const navSpy = spyOn(router,'navigate');
    const req2 = httpTestingController.expectOne("/api/groceries");
    expect(req2.request.method).toEqual('PUT');
    req2.error(null);
    expect(component.showFailureMsg).toBeTrue();
  })

  
  it('should delete grocery',()=>{
    
    const req = httpTestingController.expectOne("/api/groceries/1");
    expect(req.request.method).toEqual('GET');
    req.flush(Object.assign({},sampleGrocery));

    component.delete();
    
    const navSpy = spyOn(router,'navigate');
    const req2 = httpTestingController.expectOne("/api/groceries/1");
    expect(req2.request.method).toEqual('DELETE');
    req2.flush(Object.assign({},sampleGrocery));
    expect(router.navigate).toHaveBeenCalledWith(['/'])
  })

    
  it('should handle delete failure',()=>{
    
    const req = httpTestingController.expectOne("/api/groceries/1");
    expect(req.request.method).toEqual('GET');
    req.flush(Object.assign({},sampleGrocery));

    component.delete();
    
    const navSpy = spyOn(router,'navigate');
    const req2 = httpTestingController.expectOne("/api/groceries/1");
    expect(req2.request.method).toEqual('DELETE');
    req2.error(null);
    expect(component.showFailureMsg).toBeTrue();
  })

});


describe('GroceryEditorComponent - View Mode', () => {
  let component: GroceryEditorComponent;
  let fixture: ComponentFixture<GroceryEditorComponent>;
  let router: Router;
  let route: ActivatedRoute;

  
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryEditorComponent ],
      imports: [ HttpClientTestingModule,RouterTestingModule.withRoutes([]),
      NgbModule]
    });
      
    TestBed.overrideProvider(ActivatedRoute,{useValue:{
      url:new Observable(sub=>{
        sub.next([{'path':'view'},{'path':1}]);
      })
    }});

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    router.initialNavigation();
    
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should render view page', () => {
      expect(component.mode).toEqual(EditorMode.VIEW);
      expect(component.operation).toEqual("Grocery Details")
      expect(component.groceryForm.disabled).toEqual(true);
  });

  it('should show edit and delete button',()=>{
      expect(fixture.nativeElement.querySelector("#deleteBtn")).toBeTruthy();
      expect(fixture.nativeElement.querySelector("#editBtn")).toBeTruthy();
  })

  
  it('should populate form', fakeAsync(() => {
    const req = httpTestingController.expectOne("/api/groceries/1")
    req.flush(Object.assign({},sampleGrocery));
    fixture.detectChanges();
    tick();
    expect(component.groceryForm.get('name').value).toEqual("Apple");
  }));


});
