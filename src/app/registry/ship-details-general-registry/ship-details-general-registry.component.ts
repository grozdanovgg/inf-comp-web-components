import { Component, Input } from '@angular/core';
import { Ship } from 'src/app/model/ship';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ship-details-general-registry',
  templateUrl: './ship-details-general-registry.component.html',
  styleUrls: ['./ship-details-general-registry.component.scss']
})
export class ShipDetailsGeneralRegistryComponent  {
  @Input() ship!: Ship;
  NFTExplorerEndpoint = environment.NFTExplorerEndpoint;
}
