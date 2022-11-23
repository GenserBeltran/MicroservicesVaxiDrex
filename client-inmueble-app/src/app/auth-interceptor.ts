import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }
  //Este interceptor toma todo los request generados de angular hacia el backend y
  // antes de qeu llegue al servidor modificar la data o agregar la logica deseada
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenSeguridad = localStorage.getItem('token');

    if (!tokenSeguridad) {
      return next.handle(req);
    }

    const request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + tokenSeguridad),
    });

    return next.handle(request);
  }
}
