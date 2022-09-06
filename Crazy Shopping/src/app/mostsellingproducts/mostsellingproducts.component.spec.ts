import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostsellingproductsComponent } from './mostsellingproducts.component';

describe('MostsellingproductsComponent', () => {
  let component: MostsellingproductsComponent;
  let fixture: ComponentFixture<MostsellingproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostsellingproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostsellingproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
