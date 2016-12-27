const mkdirp = require('mkdirp');
import fs = require('fs');

module.exports = function () {

    let reporter = require('cucumber-html-reporter');
    let outputDir = 'test/results/cucumber';
    let targetJson = `${outputDir}/cucumber_report.json`;
    let info_paths = {
        branch: `${__dirname}/../../app_branch.txt`,
        version: `${__dirname}/../../app_version.txt`,
    }


    let appBranch = fs.existsSync(info_paths.branch) ? 
        fs.readFileSync(info_paths.branch).toString().trim().toUpperCase() : undefined;
    let appVersion = fs.existsSync(info_paths.version) ? 
        fs.readFileSync(info_paths.version).toString().trim() : undefined;

    let name = (appBranch && appVersion) ? `${appVersion}/${appBranch}` : 'LOCAL'

    let options = {
        theme: 'bootstrap',
        jsonFile: targetJson,
        output: `${outputDir}/index.html`,
        reportSuiteAsScenarios: true,
        name: `${name}`
    };

    this.After(function (scenario, callback) {
        if (scenario.isFailed()) {

            browser.driver.takeScreenshot().then(function (buffer) {
                scenario.attach(new Buffer(buffer, 'base64'), 'image/png');
                callback();
            }, function (err) {
                callback(err);
            })

            // browser.takeScreenshot().then(function (base64png) {
            //     let decodedImage = new Buffer(base64png, 'base64').toString('binary');
            //     scenario.attach(decodedImage, 'image/png');
            //     callback();
            // }, function (err) {
            //     callback(err);
            // });

        } else {
            callback();
        }
    });

    // // let fs = require('fs');

    // let createHtmlReport = function (sourceJson) {
    //     let CucumberHtmlReport = require('cucumber-html-report');
    //     let report = new CucumberHtmlReport({
    //         source: sourceJson, // source json
    //         dest: outputDir // target directory (will create if not exists)
    //     });
    //     report.createReport();
    // };

    let Cucumber = require('cucumber');


    let JsonFormatter = Cucumber.Listener.JsonFormatter();
    JsonFormatter.log = function (logString: string) {
        if (!fs.existsSync(outputDir)) {
            mkdirp(outputDir);
        }
        fs.writeFile(targetJson, logString, function (err) {
            if (err) {
                console.log('Failed to save cucumber test results to json file.');
                console.log(err);
            } else {
                // createHtmlReport(targetJson);
                reporter.generate(options);
            }
        });
    };

    this.registerListener(JsonFormatter);


};
