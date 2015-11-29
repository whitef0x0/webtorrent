var auto = require('run-auto')
var path = require('path')
var fs = require('fs')
var parseTorrent = require('parse-torrent')
var test = require('tape')
var TrackerServer = require('bittorrent-tracker/server')
var WebTorrent = require('../')

var leavesPath = path.resolve(__dirname, 'content', 'Leaves of Grass by Walt Whitman.epub')
var leavesFile = fs.readFileSync(leavesPath)
var leavesTorrent = fs.readFileSync(path.resolve(__dirname, 'torrents', 'leaves.torrent'))
var leavesParsed = parseTorrent(leavesTorrent)

test('S3.1 Should not send sms for invalid phone number', function (t) {
  scenario3_1Test(t)
})

test('S3.2 Should send sms for valid phone number', function (t) {
  scenario3_2Test(t)
})
