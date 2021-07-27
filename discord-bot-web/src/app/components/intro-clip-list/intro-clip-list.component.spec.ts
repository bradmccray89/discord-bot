import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroClipListComponent } from './intro-clip-list.component';

describe('IntroClipListComponent', () => {
  let component: IntroClipListComponent;
  let fixture: ComponentFixture<IntroClipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroClipListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroClipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
