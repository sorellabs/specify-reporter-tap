# buddy-tap [![Build Status](https://travis-ci.org/buddyjs/buddy-tap.png)](https://travis-ci.org/buddyjs/buddy-tap) ![Dependencies Status](https://david-dm.org/buddyjs/buddy-tap.png)
  
TAP reporter for Buddy.

## Example

You pass the `buddy-tap` library as your reporter:

```js
var spec   = require('test-buddy')()
var assert = require('assert')

spec('Your thing', function(it) {
  it('Should do X', function() {
    assert.strictEqual(f(x), g(x))
  })
})

spec.run(require('buddy-tap')())
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

    $ npm install buddy-tap
    
## Licence

MIT/X11. IOW you just do whatever the fuck you want to ;3
