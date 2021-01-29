const level = require('level');
const db = level('inc.db', { valueEncoding: 'json' });

async function main() {
    try {
        const value = await db.get('count');
        await db.put('count', value + 1);
        console.log(value);
    } catch {
        await db.put('count', 0);
    }
}

main();