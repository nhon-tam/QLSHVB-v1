import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoQuanDetailComponent } from './co-quan-detail.component';

describe('CoQuanDetailComponent', () => {
  let component: CoQuanDetailComponent;
  let fixture: ComponentFixture<CoQuanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoQuanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoQuanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
