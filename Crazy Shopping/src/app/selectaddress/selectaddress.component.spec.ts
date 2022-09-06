import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectaddressComponent } from './selectaddress.component';

describe('SelectaddressComponent', () => {
  let component: SelectaddressComponent;
  let fixture: ComponentFixture<SelectaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectaddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
