import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalthanhcongComponent } from './modalthanhcong.component';

describe('ModalthanhcongComponent', () => {
  let component: ModalthanhcongComponent;
  let fixture: ComponentFixture<ModalthanhcongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalthanhcongComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalthanhcongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
