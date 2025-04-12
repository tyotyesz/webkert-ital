import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KulonlegesComponent } from './kulonleges.component';

describe('KulonlegesComponent', () => {
  let component: KulonlegesComponent;
  let fixture: ComponentFixture<KulonlegesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KulonlegesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KulonlegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
