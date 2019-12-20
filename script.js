var fs = require('fs');

function stitchFiles(dirname) {
    this.data = [];
    this.readFiles(dirname)
        .then(data => {
            //console.log('data', data.flat());
            this.data = [].concat.apply([], data);
        });
} 

stitchFiles.prototype.readFiles = function(dirname) {
    return new Promise((res, rej) => {
        fs.readdir(dirname, (err, filenames) => {
            if (err) rej(err);
            let data = [];
            filenames.forEach((filename) => {
                let rawdata = fs.readFileSync(dirname + filename);
                let parsed = JSON.parse(rawdata);
                data.push(parsed);
            });
            res(data);
        });
    });
}

stitchFiles.prototype.writeFile = function(filename) {
    fs.writeFileSync(filename, JSON.stringify(this.data));
}

let getStitched = new stitchFiles('crossiscoming/');
getdata();
async function getdata() {
    let data = await getStitched.readFiles('crossiscoming/');
    data = [].concat.apply([], data);
    console.log('data', getStitched.data);
    getStitched.writeFile('stitched.json')
}