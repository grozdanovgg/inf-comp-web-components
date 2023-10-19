import { ModuleWithProviders, Type } from "@angular/core";
import { RegistryModule } from "src/app/registry/registry.module";
import { RegistryComponent } from "src/app/registry/registry.component";
import { ShipDepositComponent } from "src/app/ship-deposit/ship-deposit.component";
import { ShipDepositModule } from "src/app/ship-deposit/ship-deposit.module";
import { ShipWithdrawComponent } from "src/app/ship-withdraw/ship-withdraw.component";
import { ShipWithdrawModule } from "src/app/ship-withdraw/ship-withdraw.module";
import { WarehouseRoutingComponent } from "src/app/warehouse/warehouse-routing.component";
import { WarehouseModule } from "src/app/warehouse/warehouse.module";

 /**
  * This file is to be replaced by the other build-config files according to the fileReplace configurations in angular.json
  */
export const customElementsMap = new Map<string, Type<any>>([
  ['inf-wcomp-warehouse', WarehouseRoutingComponent],
  ['inf-wcomp-ship-withdraw', ShipWithdrawComponent],
  ['inf-wcomp-ship-deposit', ShipDepositComponent],
  ['inf-wcomp-registry', RegistryComponent],
]);

export const rootWebComponentModules: (any[] | Type<any> | ModuleWithProviders<{}>)[] = [
  WarehouseModule,
  ShipWithdrawModule,
  ShipDepositModule,
  RegistryModule
];