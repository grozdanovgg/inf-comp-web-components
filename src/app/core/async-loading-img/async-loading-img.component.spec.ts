import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncLoadingImgComponent } from './async-loading-img.component';

describe('AsyncLoadingImgComponentComponent', () => {
  let component: AsyncLoadingImgComponent;
  let fixture: ComponentFixture<AsyncLoadingImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsyncLoadingImgComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncLoadingImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
