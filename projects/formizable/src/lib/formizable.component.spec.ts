import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormizableComponent } from './formizable.component';

describe('FormizableComponent', () => {
  let component: FormizableComponent;
  let fixture: ComponentFixture<FormizableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormizableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
