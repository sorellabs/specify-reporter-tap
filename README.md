Hi-Five: TAP reporter
=====================

[![Build Status](https://travis-ci.org/hifivejs/hifive-tap.png)](https://travis-ci.org/hifivejs/hifive-tap)
[![Dependencies Status](https://david-dm.org/hifivejs/hifive-tap.png)](https://david-dm.org/hifivejs/hifive-tap.png)
[![NPM version](https://badge.fury.io/js/hifive-tap.png)](http://badge.fury.io/js/hifive-tap)
[![unstable](http://hughsk.github.io/stability-badges/dist/unstable.svg)](http://github.com/hughsk/stability-badges)

[![browser support](http://ci.testling.com/hifivejs/hifive-tap.png)](http://ci.testling.com/hifivejs/hifive-tap)

TAP reporter for [Hi-Five](https://github.com/hifivejs/hifive).


## Example

You pass the `hifive-tap` library as your reporter:

```js
var spec   = require('hifive')()
var assert = require('assert')

spec('Your thing', function(it) {
  it('Should do X', function() {
    assert.strictEqual(f(x), g(x))
  })
})

spec.run(require('hifive-tap')())
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

    $ npm install hifive-tap
    
    
## Licence

Copyright (c) 2013 Quildreen Motta.

Released under the [MIT licence](https://github.com/hifivejs/hifive-tap/blob/master/LICENCE).

