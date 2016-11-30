var fs = require("fs");

function JSONStore(storePath) {
    function retrieve() {
        return new Promise(function(resolve, _reject) {
            var reject = function(err) { log(err); _reject(err); };
            fs.access(storePath, fs.R_OK, function(error) {
                if (error) {
                    fs.writeFile(storePath, JSON.stringify({}), function(error) {
                        if (error) {
                            reject(error);
                        }
                    });
                    resolve({});
                } else {
                    fs.readFile(storePath, function(error, contents) {
                        if (error) {
                            reject(error);
                        }
                        try {
                            resolve(JSON.parse(contents));
                        } catch (error) {
                            reject(error);
                        }
                    });
                }
            });
        });
    }

    function store(contents) {
        return new Promise(function(resolve, reject) {
            try {
                fs.writeFile(storePath, JSON.stringify(contents), function(error) {
                    if (error) {
                        reject(error);
                    }
                    resolve(contents);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    function destroy() {
        return new Promise(function(resolve, reject) {
            fs.unlink(storePath, function(error) {
                if (error && error.code !== "ENOENT") {
                    reject(error);
                }
                resolve();
            });
        });
    }

    this.retrieve = retrieve;
    this.store = store;
    this.destroy = destroy;
};

module.exports = JSONStore;
