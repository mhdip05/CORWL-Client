import { TestBed } from '@angular/core/testing';

import { EmployeeResolver } from './employee.resolver';
import { CreditResolver } from './credit.resolver';
import { ProformaInvoiceResolver } from './proforma-invoice.resolver';

describe('EmployeeResolver', () => {
  let resolver: EmployeeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EmployeeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
