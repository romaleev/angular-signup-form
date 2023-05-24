import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RegisterService } from './register.service';
import { apiEnvironment } from '../environments/api.environment';

describe('RegisterService', () => {
  let injector: TestBed;
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });
    injector = getTestBed();
    service = injector.inject(RegisterService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should register user', () => {
    const dummyUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@mail.com',
      password: 'Password-2020'
    };

    service.register(dummyUser).subscribe((body) => {
      expect(body).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${apiEnvironment.apiUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyUser);
    req.flush(dummyUser);
  });
});
