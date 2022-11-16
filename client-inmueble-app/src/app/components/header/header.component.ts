import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //eventEmiter que viene desde el padre
  @Output() menuToggle = new EventEmitter<void>;
  constructor() { }

  ngOnInit(): void {
  }

  onMenuToggleDispatch(): void {
    this.menuToggle.emit(); //Este evento lo toma el padre
  }

}
