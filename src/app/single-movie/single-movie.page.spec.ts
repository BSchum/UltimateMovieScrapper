import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMoviePage } from './single-movie.page';

describe('SingleMoviePage', () => {
  let component: SingleMoviePage;
  let fixture: ComponentFixture<SingleMoviePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleMoviePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
