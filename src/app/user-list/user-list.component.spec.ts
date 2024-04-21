import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { of } from 'rxjs';
import { User } from '../user.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
      imports: [RouterTestingModule]
    }).compileComponents();
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on initialization', () => {
    const users: User[] = [{ id: 1, name: 'John Doe', company: { name: 'Dana Corp' }, email: 'john@example.com', website: 'www.example.com' }];
    userService.getUsers.and.returnValue(of(users));

    fixture.detectChanges();

    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(users);
  });

  it('should format website URL correctly', () => {
    const url1 = 'http://www.example.com';
    const url2 = 'www.example.com';
    const formattedUrl1 = component.getWebsiteUrl(url1);
    const formattedUrl2 = component.getWebsiteUrl(url2);

    expect(formattedUrl1).toEqual(url1);
    expect(formattedUrl2).toEqual('http://www.' + url2);
  });
});
