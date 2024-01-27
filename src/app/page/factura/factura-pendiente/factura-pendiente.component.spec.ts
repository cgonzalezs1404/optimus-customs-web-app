import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaPendienteComponent } from './factura-pendiente.component';

describe('FacturaActivaComponent', () => {
  let component: FacturaPendienteComponent;
  let fixture: ComponentFixture<FacturaPendienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacturaPendienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacturaPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
