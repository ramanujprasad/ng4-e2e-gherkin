import { browser } from 'protractor';

export function go(site: string) {
    return browser.get(site);
}
