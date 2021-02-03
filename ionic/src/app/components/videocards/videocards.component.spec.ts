import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Videocards } from './videocards.component';

describe('Videocards', () => {
  let component: Videocards;
  let fixture: ComponentFixture<Videocards>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Videocards ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Videocards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
