import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzallitasiadatokComponent } from './szallitasiadatok.component';

describe('SzallitasiadatokComponent', () => {
  let component: SzallitasiadatokComponent;
  let fixture: ComponentFixture<SzallitasiadatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SzallitasiadatokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SzallitasiadatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
