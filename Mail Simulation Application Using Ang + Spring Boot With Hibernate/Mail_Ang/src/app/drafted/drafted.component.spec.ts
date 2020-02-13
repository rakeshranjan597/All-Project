import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftedComponent } from './drafted.component';

describe('DraftedComponent', () => {
  let component: DraftedComponent;
  let fixture: ComponentFixture<DraftedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
