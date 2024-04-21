import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';

describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users from the API via GET', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'John', email: 'john@example.com', website: 'example.com', company:{name:"GOTO"} },
      { id: 2, name: 'Jane', email: 'jane@example.com', website: 'example.com', company:{name:"GOTO"} }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toEqual('GET');

    req.flush(mockUsers);
  });

  it('should retrieve a user from the API via GET', () => {
    const userId = 1;
    const mockUser: User = { id: 1, name: 'User 1', email: 'user1@example.com', website: 'www.example1.com', company:{name:"GOTO"} };

    service.getUser(userId).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne(`https://jsonplaceholder.typicode.com/users/${userId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockUser);
  });

  it('should handle errors during HTTP requests', () => {
    const errorMessage = 'Http failure response for https://jsonplaceholder.typicode.com/users: 404 Not Found';
  
    service.getUsers().subscribe(
      () => fail('expected an error, but succeeded'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.message).toEqual(errorMessage);
      }
    );
  
    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users');
    req.error(new ErrorEvent('error', { message: errorMessage }), { status: 404, statusText: 'Not Found' });
  });
  
});
