import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhongDeleteComponent } from './phong-delete.component';

describe('PhongDeleteComponent', () => {
  let component: PhongDeleteComponent;
  let fixture: ComponentFixture<PhongDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhongDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhongDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
