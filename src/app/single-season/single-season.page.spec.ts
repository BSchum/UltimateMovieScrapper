import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSeasonPage } from './single-season.page';

describe('SingleSeasonPage', () => {
  let component: SingleSeasonPage;
  let fixture: ComponentFixture<SingleSeasonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSeasonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSeasonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
