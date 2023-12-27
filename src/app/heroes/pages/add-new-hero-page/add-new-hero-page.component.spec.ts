import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewHeroPageComponent } from './add-new-hero-page.component';

describe('AddNewHeroPageComponent', () => {
  let component: AddNewHeroPageComponent;
  let fixture: ComponentFixture<AddNewHeroPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewHeroPageComponent]
    });
    fixture = TestBed.createComponent(AddNewHeroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
