import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecatComponent } from './managecat.component';

describe('ManagecatComponent', () => {
  let component: ManagecatComponent;
  let fixture: ComponentFixture<ManagecatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagecatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
