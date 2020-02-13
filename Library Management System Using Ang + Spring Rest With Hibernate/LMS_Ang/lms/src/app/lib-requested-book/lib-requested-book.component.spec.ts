import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibRequestedBookComponent } from './lib-requested-book.component';

describe('LibRequestedBookComponent', () => {
  let component: LibRequestedBookComponent;
  let fixture: ComponentFixture<LibRequestedBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibRequestedBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibRequestedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
