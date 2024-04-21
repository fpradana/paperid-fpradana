import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../user.service';
import { of, throwError } from 'rxjs';
import { User } from '../user.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUser']);
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } }
        }
      ]
    }).compileComponents();
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to user list page', () => {
    const routerSpy = spyOn(component['router'], 'navigate');

    component.goBack();

    expect(routerSpy).toHaveBeenCalledWith(['/users']);
  });
});
