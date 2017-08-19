import { homePage } from '../page-objects/home.page-object';
import { go } from '../../common/common.page-object';
import { browser, ExpectedConditions as EC } from 'protractor';


const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

let commonStepDefinitionsWrapper = function () {

    this.Given(/^I am on the "([^"]*)"$/, function (url: string, callback:any) {
        go(url)
            .then(callback);
    });

    this.Then(/^I see label "([^"]*)"$/, function(elementKey: string, callback:any) {
        browser.driver.wait(EC.presenceOf(homePage[elementKey]));
        expect(homePage[elementKey].isPresent())
            .to.eventually.true
            .and.notify(callback);
    });

};
module.exports = commonStepDefinitionsWrapper;