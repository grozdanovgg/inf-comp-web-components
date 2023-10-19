import { WarehouseComponent } from 'src/app/warehouse/warehouse.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

const routes = [
  { path: '', component: WarehouseComponent, outlet: 'warehouse' },
  { path: 'warehouse', component: WarehouseComponent, outlet: 'warehouse' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterTestingModule.withRoutes(routes)],
  exports: [RouterTestingModule],
})
export class WarehouseRoutingModule { }
