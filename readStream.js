const level = require('level');
const db = level('batch.db', { valueEncoding: 'json' });
const to = require('to2');

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

const print = async (opts = {}) => {
    db.createReadStream(opts)
        .pipe(to.obj((row, enc, next) => {
            console.log(row, enc);
            next();
        }));

    return new Promise((res, rej) => {
        setTimeout(() => res(true), 1 * 1000);
    });
};

(async () => {
    const n = 10;
    await main(10);
    await print();
    console.log('**'.repeat(10));
    await print({ reverse: true }); //reverse
    console.log('**'.repeat(10));
    await print({ gt: 'item_6' });
    console.log('**'.repeat(10));
    await print({ lt: 'item_3' });
    console.log('**'.repeat(10));
})();