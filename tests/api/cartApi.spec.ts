import { test, expect } from '@playwright/test';

test.skip('Add item to cart via API', async ({ request }) => {
    // ejemplo simulando POST a carrito
    const response = await request.post('https://reqres.in/api/cart', {
        data: { product_id: 1, quantity: 1 }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
});