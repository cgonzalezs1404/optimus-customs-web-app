import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionMenuPrivilegioComponent } from './configuracion-menu-privilegio.component';

describe('ConfiguracionMenuPrivilegioComponent', () => {
  let component: ConfiguracionMenuPrivilegioComponent;
  let fixture: ComponentFixture<ConfiguracionMenuPrivilegioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionMenuPrivilegioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionMenuPrivilegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
