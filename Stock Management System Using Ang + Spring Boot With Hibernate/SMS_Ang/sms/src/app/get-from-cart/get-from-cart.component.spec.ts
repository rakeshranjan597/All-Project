import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFromCartComponent } from './get-from-cart.component';

describe('GetFromCartComponent', () => {
  let component: GetFromCartComponent;
  let fixture: ComponentFixture<GetFromCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFromCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFromCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
