import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPathologyComponent } from './show-pathology.component';

describe('ShowPathologyComponent', () => {
  let component: ShowPathologyComponent;
  let fixture: ComponentFixture<ShowPathologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowPathologyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowPathologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
