import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionFormComponent } from './operacion-form.component';

describe('OperacionFormComponent', () => {
  let component: OperacionFormComponent;
  let fixture: ComponentFixture<OperacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperacionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
