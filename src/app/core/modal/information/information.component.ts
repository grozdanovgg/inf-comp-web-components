import { Component, Input, OnInit } from '@angular/core';
import { IModalContentComponent, InfoModalSection } from 'src/app/core/modal/modal.types';
import { popupIcons } from '../assets'

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements IModalContentComponent, OnInit {
  @Input() closeModal!: () => void;
  @Input() data: Partial<InformationComponent> = {};

  title: string = 'warehouse.modal.information.title';
  sections: InfoModalSection[] = [{ subTitle: '', text: [''] }];
  icons = popupIcons;

  ngOnInit(): void {
    this.data.title && (this.title = this.data.title);
    this.data.sections && (this.sections = this.data.sections);
  }
}
