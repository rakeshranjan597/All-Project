import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibGetAllBookComponent } from './lib-get-all-book.component';

describe('LibGetAllBookComponent', () => {
  let component: LibGetAllBookComponent;
  let fixture: ComponentFixture<LibGetAllBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibGetAllBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibGetAllBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
