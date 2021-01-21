import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiderwebChartComponent } from './spiderweb-chart.component';

describe('SpiderwebChartComponent', () => {
  let component: SpiderwebChartComponent;
  let fixture: ComponentFixture<SpiderwebChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpiderwebChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiderwebChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
