import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptekComponent } from './receptek.component';

describe('ReceptekComponent', () => {
  let component: ReceptekComponent;
  let fixture: ComponentFixture<ReceptekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
