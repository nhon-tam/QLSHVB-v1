import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuanLyLoaiHoSoComponent } from './quan-ly-loai-ho-so.component';

describe('QuanLyLoaiHoSoComponent', () => {
  let component: QuanLyLoaiHoSoComponent;
  let fixture: ComponentFixture<QuanLyLoaiHoSoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyLoaiHoSoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyLoaiHoSoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
