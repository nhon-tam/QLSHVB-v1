import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoQuanDialogComponent } from './co-quan-dialog.component';

describe('CoQuanDialogComponent', () => {
  let component: CoQuanDialogComponent;
  let fixture: ComponentFixture<CoQuanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoQuanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoQuanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
