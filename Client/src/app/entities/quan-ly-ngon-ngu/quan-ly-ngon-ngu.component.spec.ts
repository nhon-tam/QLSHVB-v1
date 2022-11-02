import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuanLyNgonNguComponent } from './quan-ly-ngon-ngu.component';

describe('QuanLyNgonNguComponent', () => {
  let component: QuanLyNgonNguComponent;
  let fixture: ComponentFixture<QuanLyNgonNguComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyNgonNguComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyNgonNguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
