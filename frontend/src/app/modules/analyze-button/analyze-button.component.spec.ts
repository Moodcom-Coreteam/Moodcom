import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalyzeButtonComponent} from './analyze-button.component';

describe('AnalyzeButtonComponent', () => {
  let component: AnalyzeButtonComponent;
  let fixture: ComponentFixture<AnalyzeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalyzeButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
