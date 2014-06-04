Hi-Five: TAP reporter
=====================

[![Dependencies Status](https://david-dm.org/hifivejs/hifive-tap.png)](https://david-dm.org/hifivejs/hifive-tap)
[![NPM version](https://badge.fury.io/js/hifive-tap.png)](http://badge.fury.io/js/hifive-tap)
[![unstable](http://hughsk.github.io/stability-badges/dist/unstable.svg)](http://github.com/hughsk/stability-badges)

[![browser support](http://ci.testling.com/hifivejs/hifive-tap.png)](http://ci.testling.com/hifivejs/hifive-tap)

TAP reporter for [Hi-Five](https://github.com/hifivejs/hifive).


## Example

You pass the `hifive-tap` library as your reporter:

```js
var hifive  = require('hifive')
var alright = require('alright')

var tests = spec 'Your thing' {
  it 'Should do X' {
    f(x) => g(x)
  }
}

hifive.runWithDefaults([tests], require('hifive-tap')())
      .fork(function(error) { throw error }
           ,function(report){ if (report.all().length === 0) process.exit(1) })
```

And get back TAP output!

```text
TAP version 13
ok 1 Your thing Should do X

1..1
# Tests ran: 1 (1ms)
# Passed:    1
# Failed:    0
```


## Installing

Just grab it from NPM:

    $ npm install hifive-tap
    
    
## Licence

Copyright (c) 2013—2014 Quildreen Motta.

Released under the [MIT licence](https://github.com/hifivejs/hifive-tap/blob/master/LICENCE).

