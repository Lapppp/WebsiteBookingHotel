import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalhuyComponent } from './modalhuy.component';

describe('ModalhuyComponent', () => {
  let component: ModalhuyComponent;
  let fixture: ComponentFixture<ModalhuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalhuyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalhuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
