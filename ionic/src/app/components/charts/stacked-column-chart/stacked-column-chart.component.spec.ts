import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StackedColumnChartComponent } from './stacked-column-chart.component';

describe('StackedColumnChartComponent', () => {
  let component: StackedColumnChartComponent;
  let fixture: ComponentFixture<StackedColumnChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedColumnChartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StackedColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
