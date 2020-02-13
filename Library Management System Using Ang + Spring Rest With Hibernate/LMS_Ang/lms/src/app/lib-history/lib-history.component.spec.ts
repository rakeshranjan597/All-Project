import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibHistoryComponent } from './lib-history.component';

describe('LibHistoryComponent', () => {
  let component: LibHistoryComponent;
  let fixture: ComponentFixture<LibHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
