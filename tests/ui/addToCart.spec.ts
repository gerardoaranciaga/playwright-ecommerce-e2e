import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { InventoryPage } from '../../pages/inventoryPage';

test('user can add first product to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Loguearse
    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');

    // Agregar producto
    await inventoryPage.addFirstProductToCart();

    // Verificar que se agregó
    await inventoryPage.verifyProductInCart(1);
});