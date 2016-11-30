var path = require("path");
var fs = require("fs");
var assert = require("assert");

var JSONStore = require("../store.js").JSONStore;

var p = path.resolve("test.json");
var s = new JSONStore(p);
var o = {
    foo: "bar",
};

function cleanup() {
    return s.destroy();
}

describe("JSONStore", function() {
    afterEach(function() {
        return cleanup();
    });
    describe("#destroy", function() {
        it("should remove the store file", function() {
            return s.destroy()
            .then(function() {
                fs.access(p, fs.R_OK, function(error) {
                    assert.fail(error);
                })
            });
        });
    });
    describe("#store", function() {
        it("should return what was stored", function() {
            return s.store(o)
            .then(function(contents) {
                assert.deepEqual(contents, o);
            });
        });
    });
    describe("#retrieve", function() {
        before(function() {
            return s.store(o);
        });
        it("should return the contents of the store", function() {
            return s.retrieve()
            .then(function(contents) {
                assert.deepEqual(contents, o);
            });
        });
    });
    describe("store then retrieve", function() {
        it("should return the same thing that was stored", function() {
            var storeResult;
            return s.store(o)
            .then(function(contents) {
                storeResult = contents;
            })
            .then(s.retrieve)
            .then(function(contents) {
                assert.deepEqual(storeResult, contents);
            });
        });
    });
});
