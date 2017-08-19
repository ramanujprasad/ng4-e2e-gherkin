import { browser } from 'protractor';
import * as fs from 'fs';
const config = require('../../protractor.config');
const metaData = require('../../package.json');
const outputDir = './reports/';
const cucumber = require('cucumber');
const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: `${outputDir}cucumber_report.json`,
    output: `${outputDir}cucumber_report.html`,
    reportSuiteAsScenarios: false,
    launchReport: true,
    metadata: {
        'App Name': metaData.name,
        'Version': metaData.version,
        'Description': metaData.description,
        'Author': metaData.author,
        'Homepage': metaData.homepage,
        'License': metaData.license,
    }
};

export = function () {
    this.registerHandler('BeforeFeature', {timeout: 10 * 1000}, (event: any) => {
        this.setDefaultTimeout(10 * 1000);       
        return browser.get(config.config.baseUrl);
    });


    this.After((scenario: any, callback: any) => {
        browser.sleep(2000);
        if (scenario.isFailed()) {
            browser.takeScreenshot().then((base64png) => {
                let decodedImage = Buffer.from(base64png, 'base64');
                scenario.attach(decodedImage, 'image/png');
                callback();
            }, (err) => {
                callback(err);
            });
        } else {
            callback();
        }
    });

    let createHtmlReport = (sourceJson: any) => {
        reporter.generate(options);
    };

    let jsonFormatter = cucumber.Listener.JsonFormatter();
    jsonFormatter.log = (jsonString: any) => {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        let targetJson = outputDir + 'cucumber_report.json';
        fs.writeFile(targetJson, jsonString, (err) => {
            if (err) {
                console.log('Failed to save cucumber test results to json file.');
                console.log(err);
            } else {
                createHtmlReport(targetJson);
            }
        });
    };
    this.registerListener(jsonFormatter);
};