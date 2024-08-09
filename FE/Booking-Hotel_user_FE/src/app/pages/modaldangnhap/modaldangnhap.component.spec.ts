import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldangnhapComponent } from './modaldangnhap.component';

describe('ModaldangnhapComponent', () => {
  let component: ModaldangnhapComponent;
  let fixture: ComponentFixture<ModaldangnhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaldangnhapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaldangnhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
