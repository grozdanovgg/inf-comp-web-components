import {
    ModuleWithProviders,
    Type
} from '@angular/core';
import { RegistryModule } from 'src/app/registry/registry.module';
import { RegistryComponent } from 'src/app/registry/registry.component';

export const customElementsMap = new Map<string, Type<any>>([
    ['inf-wcomp-registry', RegistryComponent]
]);

export const rootWebComponentModules: (any[] | Type<any> | ModuleWithProviders<{}>)[] = [
    RegistryModule
];