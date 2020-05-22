import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersManagementComponent } from './servers-management.component';

describe('ServersManagementComponent', () => {
  let component: ServersManagementComponent;
  let fixture: ComponentFixture<ServersManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServersManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
