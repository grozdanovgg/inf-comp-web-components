import {
    ModuleWithProviders,
    Type
} from '@angular/core';
import { WarehouseRoutingComponent } from "src/app/warehouse/warehouse-routing.component";
import { WarehouseModule } from "src/app/warehouse/warehouse.module";

export const customElementsMap = new Map<string, Type<any>>([
    ['inf-wcomp-warehouse', WarehouseRoutingComponent]
]);

export const rootWebComponentModules: (any[] | Type<any> | ModuleWithProviders<{}>)[] = [
    WarehouseModule
];