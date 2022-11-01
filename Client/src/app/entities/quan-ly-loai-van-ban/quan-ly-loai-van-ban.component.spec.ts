import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyLoaiVanBanComponent } from './quan-ly-loai-van-ban.component';

describe('QuanLyLoaiVanBanComponent', () => {
  let component: QuanLyLoaiVanBanComponent;
  let fixture: ComponentFixture<QuanLyLoaiVanBanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyLoaiVanBanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyLoaiVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
