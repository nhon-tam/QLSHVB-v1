import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { QuanLyPhongService } from './quan-ly-phong.service';
import { QuanLyPhongComponent } from './quan-ly-phong.component';

describe('QuanLyPhongService', () => {
  let service: QuanLyPhongService;
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
