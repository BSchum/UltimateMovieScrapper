import { TestBed } from '@angular/core/testing';
import { MovieProviderService } from './movie-provider.service';
describe('MovieProviderService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(MovieProviderService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=movie-provider.service.spec.js.map