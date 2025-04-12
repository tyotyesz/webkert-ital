import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlkoholosComponent } from './alkoholos.component';

describe('AlkoholosComponent', () => {
  let component: AlkoholosComponent;
  let fixture: ComponentFixture<AlkoholosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlkoholosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlkoholosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
