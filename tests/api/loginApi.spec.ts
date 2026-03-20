import { test, expect } from '@playwright/test';

test.skip('API login returns success', async ({ request }) => {
    const response = await request.post('https://www.saucedemo.com/rest/v1/login', {
        data: {
            username: 'standard_user', password: 'secret_sauce'
        },
    });

    expect(response.status()).toBe(200);
    // opcional: revisar contenido si hay token o mensaje
    const body = await response.json().catch(() => ({}));
    expect(body).toBeDefined();
});