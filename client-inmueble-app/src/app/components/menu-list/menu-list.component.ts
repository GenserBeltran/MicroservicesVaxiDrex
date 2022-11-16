import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  //La logica se realiza por un event emiter que la dispara el padre
  @Output() menuToggle = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  closeMenu(): void {
    this.menuToggle.emit()
    //En el padre implemento el menu
  }

}
