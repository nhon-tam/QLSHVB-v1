import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuanLyTinhTrangVatLyComponent } from './quan-ly-tt-vat-ly.component';

describe('QuanLyTinhTrangVatLyComponent', () => {
  let component: QuanLyTinhTrangVatLyComponent;
  let fixture: ComponentFixture<QuanLyTinhTrangVatLyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyTinhTrangVatLyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyTinhTrangVatLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
