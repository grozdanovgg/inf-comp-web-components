import { Component, Input, OnInit } from '@angular/core';
import { IModalContentComponent } from 'src/app/core/modal/modal.types';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements IModalContentComponent, OnInit {
  @Input() closeModal!: () => void;
  @Input() data: Partial<ConfirmComponent> = {};

  title: string = 'warehouse.modal.confirm.title';
  content: string = 'warehouse.modal.confirm.content';
  okButtonText: string = 'warehouse.modal.confirm.okButtonText';
  cancelButtonText: string = 'warehouse.modal.confirm.cancelButtonText';

  ngOnInit(): void {
    this.data.title && (this.title = this.data.title);
    this.data.content && (this.content = this.data.content);
    this.data.okButtonText && (this.okButtonText = this.data.okButtonText);
    this.data.cancelButtonText &&
      (this.cancelButtonText = this.data.cancelButtonText);
  }
}
