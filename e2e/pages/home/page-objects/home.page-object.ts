import { element, by } from 'protractor';

export let homePage =  {
    mainLabel: element(by.tagName('h1')),
    table: element(by.tagName('table'))
};