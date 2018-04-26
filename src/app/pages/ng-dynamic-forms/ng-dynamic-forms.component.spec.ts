import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDynamicFormsComponent } from './ng-dynamic-forms.component';

describe('NgDynamicFormsComponent', () => {
  let component: NgDynamicFormsComponent;
  let fixture: ComponentFixture<NgDynamicFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgDynamicFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDynamicFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
