import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly firstProductAddButton: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstProductAddButton = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]'); // primer producto
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async addFirstProductToCart() {
        await this.firstProductAddButton.click();
    }

    async verifyProductInCart(expectedCount: number) {
        await this.page.waitForSelector('.shopping_cart_badge');
        const count = await this.cartBadge.textContent();
        if (count !== expectedCount.toString()) {
            throw new Error(`Expected cart count ${expectedCount} but got ${count}`);
        }
    }
}