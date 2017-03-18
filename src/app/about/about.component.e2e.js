'use strict';
describe('About Page', () => {
    beforeEach(() => {
        browser.get('/#/about');
    });

    afterEach(()=>{
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    it('should be on /about page', () => {
        expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/about');
    });
});