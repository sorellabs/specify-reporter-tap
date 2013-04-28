var spec     = require('test-buddy')()
var reporter = require('../')

spec('tapReporter()', function(it) {
  it('failed', function() {
    throw new Error('')
  })

  it('success', function() {

  })

  it('ignored', function() {

  }).enabled = function(){ }
})

function expect(msg, ok) {
  if (ok) {
    tests.pass++
    console.log('ok ' + ++n + ' ' + msg)
  }
  else {
    tests.fail++
    console.log('not ok ' + ++n + ' ' + msg)
  }
}

console.log('TAP version 13')
var n     = 0
var tests = { pass: 0, fail: 0 }
spec.run(reporter(function(s) {
           if (/^ok /.test(s))
             expect('should be ok', s == 'ok 2 tapReporter() success')
           if (/^not ok /.test(s))
             expect('should fail', s == 'not ok 1 tapReporter() failed')
           if (/^# ignored:/.test(s))
             expect('should ignore', s == '# ignored: tapReporter() ignored')
         }))
.then(function() {
  console.log('1..3')
  console.log('# pass', tests.pass)
  console.log('# fail', tests.fail)
})