// user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array when there is no user data', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.getUsers()).toEqual([]);
  });

  it('should return user data from localStorage', () => {
    const userData = [{ userName: 'Test User', time: '30', activity: 'Running' }];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userData));
    expect(service.getUsers()).toEqual(userData);
  });

  it('should save user data to localStorage', () => {
    const userData = [{ userName: 'Test User', time: '30', activity: 'Running' }];
    spyOn(localStorage, 'setItem');
    service.saveUser(userData);
    expect(localStorage.setItem).toHaveBeenCalledWith('userData', JSON.stringify(userData));
  });
});
