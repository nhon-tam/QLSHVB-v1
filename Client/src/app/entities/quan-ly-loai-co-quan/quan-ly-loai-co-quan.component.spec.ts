import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyOrganTypeComponent } from './quan-ly-loai-co-quan.component';

describe('QuanLyNguoiDungComponent', () => {
  let component: QuanLyOrganTypeComponent;
  let fixture: ComponentFixture<QuanLyOrganTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyOrganTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyOrganTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
