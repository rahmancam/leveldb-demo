const level = require('level');
const db = level('batch.db', { valueEncoding: 'json' });

async function main(n) {
    // Atomic batch update
    try {
        const data = [];
        for (let i = 0; i < n; i++) {
            data.push({ type: 'put', key: `item_${i}`, value: i * 1000 });
        }
        await db.batch(data);
    } catch (e) {
        console.log(e);
    }
}

(async () => {
    const n = 10;
    await main(10);
    console.log(await db.get(`item_${n - 1}`));
})();