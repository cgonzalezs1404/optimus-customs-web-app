import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionUsuarioPrivilegioComponent } from './configuracion-usuario-privilegio.component';

describe('ConfiguracionUsuarioPrivilegioComponent', () => {
  let component: ConfiguracionUsuarioPrivilegioComponent;
  let fixture: ComponentFixture<ConfiguracionUsuarioPrivilegioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionUsuarioPrivilegioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionUsuarioPrivilegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
