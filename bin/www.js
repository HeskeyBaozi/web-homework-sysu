'use strict';

const debug = require('debug')('app:launch');
const app = require('../src/server');
const PORT = 8000;

app.listen(PORT);
debug(`Server is running at ${PORT}`);
