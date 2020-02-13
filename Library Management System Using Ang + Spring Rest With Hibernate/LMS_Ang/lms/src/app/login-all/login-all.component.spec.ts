import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAllComponent } from './login-all.component';

describe('LoginAllComponent', () => {
  let component: LoginAllComponent;
  let fixture: ComponentFixture<LoginAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
