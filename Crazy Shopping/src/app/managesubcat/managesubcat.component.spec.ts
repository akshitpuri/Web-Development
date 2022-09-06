import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesubcatComponent } from './managesubcat.component';

describe('ManagesubcatComponent', () => {
  let component: ManagesubcatComponent;
  let fixture: ComponentFixture<ManagesubcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesubcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesubcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
