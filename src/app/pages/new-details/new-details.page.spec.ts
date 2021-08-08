import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDetailsPage } from './new-details.page';

describe('NewDetailsPage', () => {
  let component: NewDetailsPage;
  let fixture: ComponentFixture<NewDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
