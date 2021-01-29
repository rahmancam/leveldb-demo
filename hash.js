const sha512Stream = require('crypto').createHash('sha512'); // Binary
const sha512StreamHex = require('crypto').createHash('sha512', { encoding: 'hex' }); // Binary

sha512Stream.pipe(process.stdout);
sha512Stream.write("Hello");
sha512Stream.end();

sha512StreamHex.pipe(process.stdout);
sha512StreamHex.end("Hello");

// Verify in bash
// echo -n Hello | shamsum -a 512
