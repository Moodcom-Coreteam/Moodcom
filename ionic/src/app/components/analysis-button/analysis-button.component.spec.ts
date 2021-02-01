import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnalysisButton } from './analysis-button.component';

describe('AnalysisButton', () => {
  let component: AnalysisButton;
  let fixture: ComponentFixture<AnalysisButton>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisButton ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
