import {
    ModuleWithProviders,
    Type
} from '@angular/core';
import { ShipWithdrawComponent } from 'src/app/ship-withdraw/ship-withdraw.component';
import { ShipWithdrawModule } from 'src/app/ship-withdraw/ship-withdraw.module';

export const customElementsMap = new Map<string, Type<any>>([
    ['inf-wcomp-ship-withdraw', ShipWithdrawComponent]
]);

export const rootWebComponentModules: (any[] | Type<any> | ModuleWithProviders<{}>)[] = [
    ShipWithdrawModule
];