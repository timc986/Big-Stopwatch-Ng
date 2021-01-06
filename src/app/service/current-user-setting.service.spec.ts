import { TestBed } from '@angular/core/testing';

import { CurrentUserSettingService } from './current-user-setting.service';

describe('CurrentUserSettingService', () => {
  let service: CurrentUserSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentUserSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
