import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaHistorialComponent } from './factura-historial.component';

describe('FacturaHistorialComponent', () => {
  let component: FacturaHistorialComponent;
  let fixture: ComponentFixture<FacturaHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacturaHistorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacturaHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
