import { Component, Input } from '@angular/core';
import { Ship } from 'src/app/model/ship';

@Component({
  selector: 'app-ship-details-tech',
  templateUrl: './ship-details-tech.component.html',
  styleUrls: ['./ship-details-tech.component.scss']
})
export class ShipDetailsTechComponent {

  @Input() ship!: Ship;
}
