import { apiEnvironment } from '#src/environments';
import { validUser } from '#src/mocks';
import { RegisterService } from '#src/services/register.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';

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
    service.register(validUser).subscribe((body) => {
      expect(body).toEqual(validUser);
    });

    const req = httpMock.expectOne(`${apiEnvironment.apiUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(validUser);
    req.flush(validUser);
  });
});
