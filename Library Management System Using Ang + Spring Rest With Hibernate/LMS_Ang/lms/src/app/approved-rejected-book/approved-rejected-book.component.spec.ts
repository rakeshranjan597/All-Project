import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRejectedBookComponent } from './approved-rejected-book.component';

describe('ApprovedRejectedBookComponent', () => {
  let component: ApprovedRejectedBookComponent;
  let fixture: ComponentFixture<ApprovedRejectedBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedRejectedBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedRejectedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
