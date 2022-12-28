<p align="center">
  <a href="https://github.com/lukehinds/http-post-action"><img alt="typescript-action status" src="https://github.com/lukehinds/http-post-action/workflows/build-test/badge.svg"></a>
</p>

# Simple HTTP Post (file) Action

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  url: https://example.com/upload
  artifact_name: ./test.txt
```
