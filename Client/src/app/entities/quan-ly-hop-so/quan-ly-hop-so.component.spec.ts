import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyHopSoComponent } from './quan-ly-hop-so.component';

describe('QuanLyHopSoComponent', () => {
  let component: QuanLyHopSoComponent;
  let fixture: ComponentFixture<QuanLyHopSoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyHopSoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyHopSoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
