import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserResponse } from 'src/app/store/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //eventEmiter que viene desde el padre
  @Output() menuToggle = new EventEmitter<void>();

  //Valores de entrada dentro de la barra de navegacion USER
  @Input() user!: UserResponse | null;
  //Usuario en sesion o no
  @Input() isAuthorized!: boolean | null;
  //Disparo desde este componetne al padre para salir de sesion - crear logica onSignOut
  @Output() signOut = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onMenuToggleDispatch(): void {
    this.menuToggle.emit(); //Este evento lo toma el padre
  }

  onSignOut(): void {
    //Envio la responsabilidad de salir de seion es del padre
    this.signOut.emit()
  }

}
