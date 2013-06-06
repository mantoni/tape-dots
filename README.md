# tape-dots

Dot reporter for [tape][]

Repository: <https://github.com/mantoni/tape-dots>

---

## Motivation

If you have a lot of [tape][] test cases, this little add-on shortens your console output.
It prints a `.` for each "ok" line and an `F` for each "not ok" line.
Failures are recorded and printed below the dots report.

```
$ tape-dots test/*.js
TAP version 13
# .............................................F..
# throws if 42
not ok 42 throws
  ---
    operator: throws
    expected:
      "/Ouch/"
    actual:
      {"message":"Oh noes"}
    at: assertThrows (/some/path/to/test.js:29:10)
  ...
1..48
# tests 48 | pass 47 | fail 1
```


## Usage

Install with npm:

```
$ npm install tape-dots
```

Run tape tests through tape-dots:

```
$ tape-dots test/*.js
```

Works great in the browser with [consolify][]:

```
$ consolify -o tests.html tape-dots ./test/*.js
```


## For browsers

Either include `index.js` in your web page or use [Browserify][].


## Development

Here is what you need:

 - `npm install` will install the dev dependencies
 - `make` lint the code with JSLint and run all unit tests in node

## License

MIT


[tape]: https://github.com/substack/tape
[consolify]: https://github.com/mantoni/consolify
[Browserify]: http://browserify.org
