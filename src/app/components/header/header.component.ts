import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, filter, takeUntil } from 'rxjs/operators';
import { of, Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  destroyed$: Subject<null> = new Subject();
  user$: Observable<firebase.User> = this.authService.user$;

  constructor(
    private readonly authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {

  }

  googleLogin() {
    this.authService
      .googleLogin()
      .pipe(
        catchError(error => of(null)),
        filter((res) => res),
        takeUntil(this.destroyed$)
      ).subscribe(
        data => {
          this.router.navigate(['']);
        }
      );
  }

  // emailPassLogin() {
  // }
  logout() {
    this.authService
      .logout()
      .pipe(
        catchError((error) => of(null)),
        takeUntil(this.destroyed$)
      )
      .subscribe(
        data => {
          // console.log(data);
          this.router.navigate(['']);
        }
      );
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

}
