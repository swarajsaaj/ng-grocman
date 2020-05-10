import { TestBed } from '@angular/core/testing';

import { InMemoryService } from './in-memory.service';

describe('InMemoryService', () => {
  let service: InMemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load data in-memory correctly', () => {
    const data = service.createDb();
    expect(data.groceries).toBeTruthy();
    expect(data.groceries.length).toBe(15);
  });


});
