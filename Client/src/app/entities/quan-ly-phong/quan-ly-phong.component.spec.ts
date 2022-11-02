import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyPhongComponent } from './quan-ly-phong.component';

describe('QuanLyPhongComponent', () => {
  let component: QuanLyPhongComponent;
  let fixture: ComponentFixture<QuanLyPhongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyPhongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyPhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
