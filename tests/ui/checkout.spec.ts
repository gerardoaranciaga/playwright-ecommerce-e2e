import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { InventoryPage } from '../../pages/inventoryPage';
import { CartPage } from '../../pages/cartPage';

test('user can complete checkout flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // 1️⃣ Login
    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2️⃣ Agregar primer producto
    await inventoryPage.addFirstProductToCart();

    // 3️⃣ Ir al carrito
    await cartPage.goToCart();
    await cartPage.verifyItemCount(1);

    // 4️⃣ Proceder al checkout
    await cartPage.proceedToCheckout();

    // 5️⃣ Validación simple de URL
    await expect(page).toHaveURL(/checkout-step-one/);
});