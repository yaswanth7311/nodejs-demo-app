const { test } = require('node:test');
const assert = require('node:assert');
const server = require('./app');

test('Application should return success response', async () => {
    await new Promise(resolve => server.listen(0, resolve));

    const port = server.address().port;

    try {
        const response = await fetch(`http://localhost:${port}`);

        assert.strictEqual(response.status, 200);

        const message = await response.text();

        assert.strictEqual(
            message,
            'Hello! My DevOps CI/CD application is running.'
        );
    } finally {
        await new Promise(resolve => server.close(resolve));
    }
});