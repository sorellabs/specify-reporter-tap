// # Module hifive-tap
//
// TAP reporter for Hi-Five.
//
//
// Copyright (c) 2013 Quildreen Motta
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// -- Dependencies -----------------------------------------------------
var compose = require('athena').compose



// -- Helpers ----------------------------------------------------------

// ### fullTitle(test)
//
// Retrieves the fully qualified title of a test.
//
// :: Test -> String
function fullTitle(test) {
  var title = test.title || ''
  if (test.parent) title = [fullTitle(test.parent), title].filter(Boolean)
                                                          .join(' ')
  return title }


// ### pad(n, s)
//
// Pads a string with some whitespace.
//
// :: Number, String -> String
function pad(n, s) {
  var before = Array(n + 1).join(' ')

  return s.split(/\r\n|\r|\n/)
          .map(function(a){ return before + a })
          .join('\n') }


// ### describeFailure(ex)
//
// Returns a YAML serialisation of an exception.
//
// :: Error -> String
function describeFailure(ex) {
  return ['  ---'
         ,'    type: ' + ex.name
         ,'    message: >'
         ,       pad(6, ex.message)
         ,'    stack: | '
         ,       pad(6, ex.stack)
         ,'  ...'
         ].join('\n') }


// ### describeLog(log)
//
// Returns a YAML serialisation of a LogEntry.
//
// :: LogEntry -> String
function describeLog(log) {
  return ['  ---'
         ,'    message: >'
         ,       pad(6, log.data.join(' '))
         ,'  ...'
         ].join('\n') }


// ### tapReporter(logger)(report)
//
// A reporter for TAP output of Brofist tests.
//
// You can specify an alternative logging function, by default we just
// go happily with `console.log`.
//
// :: (String... -> ()) -> Report -> ()
module.exports = function tapReporter(logger) { return function(report) {
  var i = 0

  if (!logger)  logger = console.log.bind(console)
  function log() {
    logger([].join.call(arguments, ' ')) }


  log('TAP version 13')

  report.signals.success.add(function(result) {
    log('ok', ++i, fullTitle(result.test)) })


  report.signals.failure.add(function(result) {
    log('not ok', ++i, fullTitle(result.test))
    log(describeFailure(result.exception)) })


  report.signals.ignored.add(function(result) {
    log('# ignored:', fullTitle(result.test)) })


  report.signals.result.add(function(result) {
    if (result.logs.length)
      result.logs.forEach(compose(log, describeLog)) })


  report.signals.done.add(function(results) {
    log('')
    log('1..' + i)
    log('# tests', i)
    log('# pass', results.passed.length)
    log('# fail', results.failed.length)
    log('# ignored', results.ignored.length) })
}}