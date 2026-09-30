import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  readonly stats = [
    { label: 'Ventas del mes', value: '$184.6K', change: '+12.4%' },
    { label: 'Clientes activos', value: '1,284', change: '+8.1%' },
    { label: 'Productos', value: '328', change: '+5.3%' },
    { label: 'Recibos emitidos', value: '784', change: '+17.8%' },
  ];

  readonly activity = [
    'Pedido nuevo de cemento para obra norte',
    'Cliente preferente renovó contrato',
    'Importación de inventario completada',
    'Recibo de pago procesado correctamente',
  ];

  readonly user = this.authService.currentUser();

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
