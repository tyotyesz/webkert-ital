import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JelszomodositasComponent } from './jelszomodositas.component';

describe('JelszomodositasComponent', () => {
  let component: JelszomodositasComponent;
  let fixture: ComponentFixture<JelszomodositasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JelszomodositasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JelszomodositasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
