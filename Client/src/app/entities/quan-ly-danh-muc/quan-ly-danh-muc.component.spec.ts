import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyDanhMucComponent } from './quan-ly-danh-muc.component';

describe('QuanLyDanhMucComponent', () => {
  let component: QuanLyDanhMucComponent;
  let fixture: ComponentFixture<QuanLyDanhMucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyDanhMucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyDanhMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
