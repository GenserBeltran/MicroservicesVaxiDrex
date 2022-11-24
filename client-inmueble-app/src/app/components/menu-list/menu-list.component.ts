import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  //La logica se realiza por un event emiter que la dispara el padre
  @Output() menuToggle = new EventEmitter<void>();

  //Valiables para salir y entrar en sesion
  @Input() isAuthorized !: boolean | null;
  @Output() signOut = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  closeMenu(): void {
    this.menuToggle.emit();
    //En el padre implemento el menu
  }
  //Salir de sesion
  onSignOut(): void {
    this.signOut.emit();
  }

}
