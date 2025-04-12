import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgazolasComponent } from './igazolas.component';

describe('IgazolasComponent', () => {
  let component: IgazolasComponent;
  let fixture: ComponentFixture<IgazolasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IgazolasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IgazolasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
