import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHopSoComponent } from './detail-hop-so.component';

describe('DetailHopSoComponent', () => {
  let component: DetailHopSoComponent;
  let fixture: ComponentFixture<DetailHopSoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailHopSoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHopSoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
