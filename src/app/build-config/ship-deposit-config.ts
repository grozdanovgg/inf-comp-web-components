import {
    ModuleWithProviders,
    Type
} from '@angular/core';
import { ShipDepositComponent } from 'src/app/ship-deposit/ship-deposit.component';
import { ShipDepositModule } from 'src/app/ship-deposit/ship-deposit.module';

export const customElementsMap = new Map<string, Type<any>>([
    ['inf-wcomp-ship-deposit', ShipDepositComponent]
]);

export const rootWebComponentModules: (any[] | Type<any> | ModuleWithProviders<{}>)[] = [
    ShipDepositModule
];