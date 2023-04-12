import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPostComponent } from './block-post.component';

describe('BlockPostComponent', () => {
  let component: BlockPostComponent;
  let fixture: ComponentFixture<BlockPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
