// Este arquivo é usado apenas pelo ambiente Vercel e não passa pelo linter
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { handler } = require('../dist/main');

// Exportar o handler para a Vercel
module.exports = handler;
