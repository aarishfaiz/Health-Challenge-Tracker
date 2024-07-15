import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// user.component.spec.ts
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [UserComponent],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users from UserService on init', () => {
    const userData = [{ userName: 'Test User', time: '30', activity: 'Running' }];
    spyOn(userService, 'getUsers').and.returnValue(userData);
    component.ngOnInit();
    expect(component.userArr).toEqual(userData);
  });

  it('should add a new user', () => {
    spyOn(userService, 'saveUser');
    component.user = { userName: 'Test User', time: '30', activity: 'Running' };
    component.Add();
    expect(component.userArr.length).toBe(1);
    expect(userService.saveUser).toHaveBeenCalledWith(component.userArr);
  });

  it('should reset the form after adding a user', () => {
    component.user = { userName: 'Test User', time: '30', activity: 'Running' };
    component.Add();
    expect(component.user).toEqual({ userName: '', time: '', activity: '' });
  });

  it('should alert if form fields are not filled', () => {
    spyOn(window, 'alert');
    component.user = { userName: '', time: '', activity: '' };
    component.Add();
    expect(window.alert).toHaveBeenCalledWith('Please fill out all fields');
  });
});


