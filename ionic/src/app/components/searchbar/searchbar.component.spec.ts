import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Searchbar } from './searchbar.component';

describe('Searchbar', () => {
  let component: Searchbar;
  let fixture: ComponentFixture<Searchbar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Searchbar ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Searchbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
