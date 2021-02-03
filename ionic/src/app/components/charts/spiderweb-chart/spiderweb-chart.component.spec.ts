import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpiderwebChartComponent } from './spiderweb-chart.component';

describe('SpiderwebChartComponent', () => {
  let component: SpiderwebChartComponent;
  let fixture: ComponentFixture<SpiderwebChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpiderwebChartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpiderwebChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
