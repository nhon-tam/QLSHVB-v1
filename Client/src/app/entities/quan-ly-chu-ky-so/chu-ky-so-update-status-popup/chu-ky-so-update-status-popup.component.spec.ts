import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuKySoUpdateStatusPopupComponent } from './chu-ky-so-update-status-popup.component';

describe('ChuKySoUpdateStatusPopupComponent', () => {
  let component: ChuKySoUpdateStatusPopupComponent;
  let fixture: ComponentFixture<ChuKySoUpdateStatusPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuKySoUpdateStatusPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuKySoUpdateStatusPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
