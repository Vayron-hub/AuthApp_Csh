import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    console.log('🔐 Token found, adding to request:', token.substring(0, 20) + '...');
    const cloned = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + token
      ),
    });

    return next(cloned);
  } else {
    console.log('❌ No token found for request to:', req.url);
  }

  return next(req);
};