import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProcedureComponent } from './update-procedure.component';

describe('UpdateProcedureComponent', () => {
  let component: UpdateProcedureComponent;
  let fixture: ComponentFixture<UpdateProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProcedureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
