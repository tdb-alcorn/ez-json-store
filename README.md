# ez-json-store

A simple JSON storage utility that calls Node's `fs` module.

## Example

```
var path = require("path");
var JSONStore = require("ez-json-store").JSONStore;

var shopping = {
    "milk": "1/2 gallon",
    "avocados": 3,
};

var s = new JSONStore(path.resolve("shopping.json"));
s.store(shopping)
.then(console.log);

/* ... */

s.retrieve()
.then(console.log);
```

## Methods

- `#store(contents) -> Promise(contents)`: JSON stringifies contents and then stores them at the
  given path.
- `#retrieve() -> Promise(contents)`: Retrieves whatever you stored and JSON parses it.
- `#destroy() -> Promise()`: Deletes the store file.
