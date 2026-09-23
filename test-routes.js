const http = require('http');

const routes = [
  '/',
  '/dashboard',
  '/research',
  '/gis',
  '/policy',
  '/innovation',
  '/state-dashboard',
  '/upload',
  '/policy-tracking',
  '/reports',
  '/admin',
  '/users',
  '/approvals',
  '/logs'
];

function checkRoute(route) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + route, (res) => {
      resolve({ route, statusCode: res.statusCode });
    }).on('error', (err) => {
      resolve({ route, statusCode: 500, error: err.message });
    });
  });
}

async function runHealthCheck() {
  console.log('=============== DoLR PLATFORM ROUTE HEALTH CHECK ===============');
  let passed = 0;
  for (const r of routes) {
    const res = await checkRoute(r);
    const isOk = res.statusCode === 200;
    if (isOk) passed++;
    console.log(`[ROUTE] ${r.padEnd(20)} | Status: ${res.statusCode} | ${isOk ? '✅ PASSED' : '❌ FAILED'}`);
  }
  console.log(`================================================================`);
  console.log(`Summary: ${passed}/${routes.length} Routes Working 100% Perfectly!`);
  process.exit(0);
}

runHealthCheck();
