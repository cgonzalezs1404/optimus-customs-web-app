import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaActivaComponent } from './factura-activa.component';

describe('FacturaActivaComponent', () => {
  let component: FacturaActivaComponent;
  let fixture: ComponentFixture<FacturaActivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacturaActivaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacturaActivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
