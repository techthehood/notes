at Server.command (/home/d3po/landing-pages/node_modules/mongodb-core/lib/sdam/server.js:211:14)
1|landing  |     at checkServer (/home/d3po/landing-pages/node_modules/mongodb-core/lib/sdam/monitoring.js:144:12)
1|landing  |     at Object.monitorServer [as monitorFunction] (/home/d3po/landing-pages/node_modules/mongodb-core/lib/sdam/monitoring.js:186:3)
1|landing  |     at Server.monitor (/home/d3po/landing-pages/node_modules/mongodb-core/lib/sdam/server.js:188:12)
1|landing  |     at Timeout.setTimeout [as _onTimeout] (/home/d3po/landing-pages/node_modules/mongodb-core/lib/sdam/topology.js:753:22)
1|landing  |     at ontimeout (timers.js:498:11)
1|landing  |     at tryOnTimeout (timers.js:323:5)
1|landing  |     at Timer.listOnTimeout (timers.js:290:5)
1|landing  | { MongoTimeoutError: Server selection timed out after 10000 ms
1|landing  |     at Timeout.setTimeout [as _onTimeout] (/home/d3po/landing-pages/node_modules/mongodb-core/lib/sdam/topology.js:773:16)
1|landing  |     at ontimeout (timers.js:498:11)
1|landing  |     at tryOnTimeout (timers.js:323:5)
1|landing  |     at Timer.listOnTimeout (timers.js:290:5)
1|landing  |   name: 'MongoTimeoutError',
1|landing  |   [Symbol(mongoErrorContextSymbol)]: {} }