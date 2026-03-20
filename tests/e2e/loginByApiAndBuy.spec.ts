import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { InventoryPage } from '../../pages/inventoryPage';

test.skip('login via API and continue in UI', async ({ page, request }) => {
  // 1️⃣ Logueo por API
  const response = await request.post('https://www.saucedemo.com/rest/v1/login', {
    data: { username: 'standard_user', password: 'secret_sauce' },
  });

  // opcional: setear cookies si el API devuelve sesión
  const cookies = response.headers()['set-cookie'];
  if (cookies) {
    await page.context().addCookies([{ name: 'session', value: cookies, domain: 'www.saucedemo.com', path: '/' }]);
  }

  // 2️⃣ Continuar en UI
  const inventoryPage = new InventoryPage(page);
  await page.goto('https://www.saucedemo.com/inventory.html');
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.verifyProductInCart(1);
});