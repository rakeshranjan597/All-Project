import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibReturnBookComponent } from './lib-return-book.component';

describe('LibReturnBookComponent', () => {
  let component: LibReturnBookComponent;
  let fixture: ComponentFixture<LibReturnBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibReturnBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibReturnBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
