import { TestBed } from '@angular/core/testing';

import { DataTablesOptionsService } from './data-tables-options.service';

describe('DataTablesOptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataTablesOptionsService = TestBed.get(DataTablesOptionsService);
    expect(service).toBeTruthy();
  });
});
