import { tap, map } from 'rxjs/operators';
import { filter, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import * as fromRoot from '../../store';
import * as fromUser from '../../store/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    //Objetos necesarios para la logica
    private router: Router,
    private store: Store<fromRoot.State>
  ) { }

  //Objetivo(Metodo) ingresar al store de Angular y solo valida si existe
  private check(): Observable<boolean> {
    return this.store.pipe(select(fromUser.getUserState)).pipe(
      filter(state => !state.loading),
      tap(state => {
        if (state.email) {
          this.router.navigate(['/static/welcome']);
        }
      }),
      map(state => !state.email)//Devuelve un FALSE
    )
  }

  //Metodo CanActivate retornara el estado de check
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.check();
  }

  //Metodo canActivateChild retorna la evaluacion de check
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.check();
  }

  //Metodo canLoad retornara el estado de check
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.check();
  }

}
