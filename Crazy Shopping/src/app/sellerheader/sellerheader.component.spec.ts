import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerheaderComponent } from './sellerheader.component';

describe('SellerheaderComponent', () => {
  let component: SellerheaderComponent;
  let fixture: ComponentFixture<SellerheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
