import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyTaiLieuComponent } from './quan-ly-tai-lieu.component';

describe('QuanLyTaiLieuComponent', () => {
  let component: QuanLyTaiLieuComponent;
  let fixture: ComponentFixture<QuanLyTaiLieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyTaiLieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyTaiLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
