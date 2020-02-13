import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibStudProfileComponent } from './lib-stud-profile.component';

describe('LibStudProfileComponent', () => {
  let component: LibStudProfileComponent;
  let fixture: ComponentFixture<LibStudProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibStudProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibStudProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
