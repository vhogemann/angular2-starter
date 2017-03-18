'use strict';
describe('App', () => {
    beforeEach(() => {
        browser.get('/');
    });

    it('should have a title', () => {
        let subject = browser.getTitle();
        let result = 'Angular2 Starter';
        expect(subject).toEqual(result);
    });

    it('should redirect /about component', () => {
        expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/about');
    });

});
