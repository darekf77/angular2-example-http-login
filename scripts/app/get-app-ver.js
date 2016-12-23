
const git = require('simple-git')(__dirname + '/../..');

function getEcrmVersion() {
    let oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 3);

    let loggit = {};
    loggit['--max-count=5'] = 5;

    git.log(loggit, function (err, l) {
        if (err) {
            defer.resolve('Error: Can acces git');
            process.exit(0);
        }
        if (l.all && l.all.length > 0) {
            let first = l.all[0];
            let timestamp = Date.parse(first.date);
            let version =  parseInt(timestamp)/1000 - 1460801399 - 18507000;
            console.log(version);
            process.exit(0);
        } else {
            console.log('Error: Can not resove version from commits');
            process.exit(1);
        }
    })
}



getEcrmVersion();