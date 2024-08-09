import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalthatbaiComponent } from './modalthatbai.component';

describe('ModalthatbaiComponent', () => {
  let component: ModalthatbaiComponent;
  let fixture: ComponentFixture<ModalthatbaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalthatbaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalthatbaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
