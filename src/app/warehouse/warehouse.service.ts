import { Injectable } from '@angular/core';

type WarehouseState = {
  browserEnv: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  state: WarehouseState = {
    browserEnv: true
  };

  updateState(newState: WarehouseState): void {
    this.state = {
      ...this.state,
      ...newState
    };
  }

  getState(): WarehouseState {
    return this.state;
  }
}
