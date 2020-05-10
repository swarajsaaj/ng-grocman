import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryListComponent } from './grocery-list.component';
import { IGrocery } from 'src/app/shared/models/grocery.model';

describe('GroceryListComponent', () => {
  let component: GroceryListComponent;
  let fixture: ComponentFixture<GroceryListComponent>;

  let testList:IGrocery[]=[{"id":1,"name":"Longos - Penne With Pesto","description":"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.","unitPrice":41,"quantity":10,"manufacturedDate":new Date(),"expiryDate":new Date()},
  {"id":2,"name":"Wine - Rubyport","description":"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.","unitPrice":86,"quantity":15,"manufacturedDate":new Date(),"expiryDate":new Date()}];  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render grocery rows',()=>{
    component.groceries=testList;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll("tbody tr").length).toBe(2);
  });

  it('should allow row click/selection',(done)=>{
    component.groceries=testList;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    component.selected.subscribe((data)=>{
      expect(data.id).toBe(1);
      done();
    })
    compiled.querySelector("tbody tr").click();
    
  });

});
