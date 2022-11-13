import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  //Color y modo
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor() { }

  ngOnInit(): void {
  }

}
