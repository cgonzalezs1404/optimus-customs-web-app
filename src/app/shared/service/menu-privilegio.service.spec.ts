import { TestBed } from '@angular/core/testing';

import { MenuPrivilegioService } from './menu-privilegio.service';

describe('MenuPrivilegioService', () => {
  let service: MenuPrivilegioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuPrivilegioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
