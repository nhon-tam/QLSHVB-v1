import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuanLyMucDoTinCayComponent } from './muc-do-tin-cay.component';

describe('QuanLyMucDoTinCayComponent', () => {
  let component: QuanLyMucDoTinCayComponent;
  let fixture: ComponentFixture<QuanLyMucDoTinCayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyMucDoTinCayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyMucDoTinCayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
