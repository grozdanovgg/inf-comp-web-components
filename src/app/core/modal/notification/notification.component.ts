import { Component, Input, OnInit } from '@angular/core';
import { IModalContentComponent } from 'src/app/core/modal/modal.types';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements IModalContentComponent, OnInit {
  @Input() closeModal!: () => void;
  @Input() data: Partial<NotificationComponent> = {};

  title: string = 'warehouse.modal.notification.title';
  content: string = 'warehouse.modal.notification.content';
  buttonText: string = 'warehouse.modal.notification.buttonText';

  ngOnInit(): void {
    this.data.title && (this.title = this.data.title);
    this.data.content && (this.content = this.data.content);
    this.data.buttonText && (this.buttonText = this.data.buttonText);
  }
}
