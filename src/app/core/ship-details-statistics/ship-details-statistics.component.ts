import { Component, Input } from '@angular/core';
import { Ship } from 'src/app/model/ship';
import { extractKeyProperty } from 'src/app/utils/transformation.utils';
import { statsPathsIcons } from './assets';

@Component({
  selector: 'app-ship-details-statistics',
  templateUrl: './ship-details-statistics.component.html',
  styleUrls: ['./ship-details-statistics.component.scss']
})
export class ShipDetailsStatisticsComponent {
  @Input() set observe(ship: Ship) {
    this.ship = new Ship(ship);
    this.computedStats = extractKeyProperty(ship.Stats, 'Name');
  }

  ship!: Ship;
  computedStats!: { [key: string]: { Value: number; }; };

  abilities = ['firepower', 'range', 'hull', 'shields', 'speed', 'agility'];
  icons = statsPathsIcons;
}
