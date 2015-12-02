var cp = require('child_process')
var spawn = require('cross-spawn-async')
var path = require('path')
var fs = require('fs')
var parseTorrent = require('parse-torrent')
var test = require('tape')

var CMD_PATH = path.resolve(__dirname, '..', 'bin', 'cmd.js')
var CMD = 'node ' + CMD_PATH

test('Command line: webtorrent help', function (t) {
  t.plan(6)

  cp.exec(CMD + ' help', function (err, data) {
    t.error(err) // no error, exit code 0
    t.ok(data.toLowerCase().indexOf('usage') !== -1)
  })

  cp.exec(CMD + ' --help', function (err, data) {
    t.error(err) // no error, exit code 0
    t.ok(data.toLowerCase().indexOf('usage') !== -1)
  })

  cp.exec(CMD, function (err, data) {
    t.error(err) // no error, exit code 0
    t.ok(data.toLowerCase().indexOf('usage') !== -1)
  })
})

test('Command line: webtorrent version', function (t) {
  t.plan(6)
  var expectedVersion = require(path.resolve(__dirname, '..', 'package.json')).version + '\n'

  cp.exec(CMD + ' version', function (err, data) {
    t.error(err)
    t.equal(data, expectedVersion)
  })

  cp.exec(CMD + ' --version', function (err, data) {
    t.error(err)
    t.equal(data, expectedVersion)
  })

  cp.exec(CMD + ' -v', function (err, data) {
    t.error(err)
    t.equal(data, expectedVersion)
  })
})

test('Command line: webtorrent info /path/to/file.torrent', function (t) {
  t.plan(3)

  var leavesPath = path.resolve(__dirname, 'torrents', 'leaves.torrent')
  var leaves = fs.readFileSync(leavesPath)

  cp.exec(CMD + ' info ' + leavesPath, function (err, data) {
    t.error(err)
    data = JSON.parse(data)
    var parsedTorrent = parseTorrent(leaves)
    delete parsedTorrent.info
    delete parsedTorrent.infoBuffer
    t.deepEqual(data, JSON.parse(JSON.stringify(parsedTorrent, undefined, 2)))
  })

  cp.exec(CMD + ' info /bad/path', function (err) {
    t.ok(err instanceof Error)
  })
})

test('Command line: webtorrent info magnet_uri', function (t) {
  t.plan(2)

  var leavesMagnetURI = 'magnet:?xt=urn:btih:d2474e86c95b19b8bcfdb92bc12c9d44667cfa36&dn=Leaves+of+Grass+by+Walt+Whitman.epub&tr=http%3A%2F%2Ftracker.bittorrent.am%2Fannounce&tr=http%3A%2F%2Ftracker.thepiratebay.org%2Fannounce&tr=udp%3A%2F%2Ffr33domtracker.h33t.com%3A3310%2Fannounce&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80'

  cp.exec(CMD + ' info "' + leavesMagnetURI + '"', function (err, data) {
    t.error(err)
    data = JSON.parse(data)
    var parsedTorrent = parseTorrent(leavesMagnetURI)
    t.deepEqual(data, JSON.parse(JSON.stringify(parsedTorrent, undefined, 2)))
  })
})

test('Command line: webtorrent create /path/to/file', function (t) {
  t.plan(1)

  var leavesPath = path.resolve(__dirname, 'content', 'Leaves of Grass by Walt Whitman.epub')

  var child = spawn('node', [ CMD_PATH, 'create', leavesPath ])
  child.on('error', function (err) { t.fail(err) })

  var chunks = []
  child.stdout.on('data', function (chunk) {
    chunks.push(chunk)
  })
  child.stdout.on('end', function () {
    var buf = Buffer.concat(chunks)
    var parsedTorrent = parseTorrent(new Buffer(buf, 'binary'))
    t.deepEqual(parsedTorrent.infoHash, 'd2474e86c95b19b8bcfdb92bc12c9d44667cfa36')
  })
})

test('Command line: webtorrent download /path/to/file --port 80', function (t) {
  t.plan(2)

  var leavesPath = path.resolve(__dirname, 'torrents', 'leaves.torrent')
  cp.exec(CMD + ' --port 80 --out content download ' + leavesPath, {maxBuffer: 1024 * 500}, function (err, data) {
    t.error(err)
    t.ok(data.indexOf('successfully') !== -1)
  })
})
