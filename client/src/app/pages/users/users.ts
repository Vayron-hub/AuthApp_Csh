import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class UsersComponent {
  authService = inject(AuthService);
  user$ = this.authService.getAll();
}