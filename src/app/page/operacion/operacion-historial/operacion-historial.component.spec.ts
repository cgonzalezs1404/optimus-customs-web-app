import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionHistorialComponent } from './operacion-historial.component';

describe('OperacionHistorialComponent', () => {
  let component: OperacionHistorialComponent;
  let fixture: ComponentFixture<OperacionHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperacionHistorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperacionHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
