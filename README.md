Brofist: TAP reporter
=====================

[![Build Status](https://travis-ci.org/brofistjs/brofist-tap.png)](https://travis-ci.org/brofistjs/brofist-tap)
[![Dependencies Status](https://david-dm.org/brofistjs/brofist-tap.png)](https://david-dm.org/brofistjs/brofist-tap)
  
TAP reporter for Brofist.


## Example

You pass the `brofist-tap` library as your reporter:

```js
var spec   = require('brofist')()
var assert = require('assert')

spec('Your thing', function(it) {
  it('Should do X', function() {
    assert.strictEqual(f(x), g(x))
  })
})

spec.run(require('brofist-tap')())
```

And get back TAP output!

```text
TAP version 13
ok 1 Your thing Should do X

1..1
# tests 1
# pass 1
# fail 0
# ignored 0
```


## Installing

Just grab it from NPM:

    $ npm install brofist-tap
    
    
## Licence

MIT/X11. IOW you just do whatever the fuck you want to ;3
