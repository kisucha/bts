var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();
var PORT = process.env.PORT || 3000;

var DATA_DIR = path.join(__dirname, 'data');
var DATA_FILE = path.join(DATA_DIR, 'tennis.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readData() {
  ensureDataDir();
  try {
    if (fs.existsSync(DATA_FILE)) {
      var raw = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error(e);
  }
  return { users: [], events: {}, scores: {}, baseScores: {}, matchScores: {}, headToHead: {}, matchWins: {} };
}

function writeData(data) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

app.use(express.json({ limit: '2mb' }));
app.use(express.static(__dirname));

app.get('/api/state', function (req, res) {
  try {
    var data = readData();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/state', function (req, res) {
  try {
    var body = req.body;
    var data = {
      users: body.users || [],
      events: body.events || {},
      scores: body.scores || {},
      baseScores: body.baseScores || {},
      matchScores: body.matchScores || {},
      headToHead: body.headToHead || {},
      matchWins: body.matchWins || {}
    };
    writeData(data);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, function () {
  console.log('테니스 클럽 서버: http://localhost:' + PORT);
});
