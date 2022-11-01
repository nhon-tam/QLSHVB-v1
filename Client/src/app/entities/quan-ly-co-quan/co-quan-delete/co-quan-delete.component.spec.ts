import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoQuanDeleteComponent } from './co-quan-delete.component';

describe('CoQuanDeleteComponent', () => {
  let component: CoQuanDeleteComponent;
  let fixture: ComponentFixture<CoQuanDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoQuanDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoQuanDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
