// -- Dependencies -----------------------------------------------------
var Maybe    = require('data.maybe')
var compose  = require('core.lambda').compose
var constant = require('core.lambda').constant
var curry    = require('core.lambda').curry

var Just    = Maybe.Just
var Nothing = Maybe.Nothing



// -- Helpers ----------------------------------------------------------

/**
 * Pads a string with some whitespace.
 *
 * @summary Number, String → String
 */
function pad(n, s) {
  var before = Array(n + 1).join(' ')

  return s.split(/\r\n|\r|\n/)
          .map(function(a){ return before + a })
          .join('\n') }


/**
 * Returns a YAML serialisation of an exception.
 *
 * @summary Error → String
 */
function describeFailure(ex) {
  return ex.stack?        ['  ---'
                          ,'    type: ' + ex.name
                          ,'    message: >'
                          ,       pad(6, ex.message)
                          ,'    stack: | '
                          ,       pad(6, ex.stack)
                          ,'  ...'
                          ].join('\n')
  :      /* otherwise */  ['  ---'
                          ,'    message: >'
                          ,       pad(6, ex.toString())
                          ,'  ...'
                          ].join('\n')
}


/**
 * Returns a YAML representation of a LogEntry.
 *
 * @summary LogEntry → String
 */
function describeLog(entry) {
  return ['  ---'
         ,'    message: >'
         ,       pad(6, entry.log.join(' '))
         ,'  ...'
         ].join('\n') }


/**
 * Checks if a signal should count as a test result in TAP.
 *
 * @summary Signal → Boolean
 */
function countSignal(signal) {
  return signal.isTestResult && !signal.value.isIgnored
}


/**
 * Renders a single result for TAP.
 *
 * @method
 * @summary Number → Result → String
 */
renderResult = curry(2, renderResult)
function renderResult(index, result) {
  return result.cata({
    Success: function(){
      return 'ok ' + index + ' ' + result.fullTitle()
           + '\n' + result.log.map(describeLog).join('\n') }
  , Failure: function(){
      return 'not ok ' + index + ' ' + result.fullTitle()
           + '\n' + describeFailure(result.exception)
           + '\n' + result.log.map(describeLog).join('\n') }
  , Ignored: function(){
      return '# ignored: ' + result.fullTitle() + '\n' }
  })
}


/**
 * Re-throws an error.
 *
 * @summary Error → Void
 */
function raise(error){ setTimeout(function(){ throw error }) }


/**
 * A reporter for TAP output of Hi-Five tests.
 *
 * You can specify an alternative logging functionk, by default we just go
 * happily with `console.log`.
 *
 * @summary
 * (String... → Void)
 * → Rx.Observable[Error, Signal], Future[Error, Report]
 * → Void
 */
module.exports = function tapReporter(logger) { return function(stream, report) {

  if (!logger)  logger = console.log.bind(console)
  function log() {
    logger([].join.call(arguments, ' ')) }


  log('TAP version 13')

  var enumeration = stream.scan(0, function(acc, x){
                      return countSignal(x)? acc + 1
                      :      /* otherwise */ acc
                    })

  var toRender = enumeration
                   .zip(stream, function(a, b){ return { index: a, value: b }})
                   .map(function(a) {
                     return a.value.cata({
                       Started    : Nothing
                     , TestResult : compose(Just, renderResult(a.index))
                     , Finished   : Nothing })})


  toRender.subscribe(function(x){ x.chain(log) }, raise)
  report.subscribe(function(data) {
    var tests   = data.passed.length + data.failed.length
    var ignored = data.ignored.length

    log('')
    log('1..' + tests)
    log('# Tests ran: ' + tests + ' (' + renderIgnored(ignored) + data.time() + 'ms)')
    log('# Passed:    ' + data.passed.length)
    log('# Failed:    ' + data.failed.length)
  }, raise)

  function renderIgnored(x){ return x? x + ' ignored / ' : '' }
}}
