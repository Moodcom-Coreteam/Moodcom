import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user : SocialUser;
  lightMode: boolean = false;

  @Output()
  readonly lightModeSwitched = new EventEmitter<boolean>();

  constructor(private authService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.lightModeSwitched.emit(false);
    this.authService.authState.subscribe((user) =>
      this.user = user
    );
  }

  onDarkModeSwitched({checked}: MatSlideToggleChange) {
    this.lightMode = !this.lightMode;
    this.lightModeSwitched.emit(checked);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.ngOnInit();
  }

  signOut(): void {
    this.authService.signOut();
    this.ngOnInit();
  }

  text() {
    if (this.user != null){
      return "Se deconnecter";
    }
    else {
      return "Se connecter";
    }
  }
}
