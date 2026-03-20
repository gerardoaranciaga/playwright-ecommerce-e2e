import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('button[data-test="checkout"]');
        this.cartItems = page.locator('.cart_item');
    }

    async goToCart() {
        await this.page.click('.shopping_cart_link');
        await this.page.waitForSelector('.cart_item');
    }

    async verifyItemCount(expectedCount: number) {
        const count = await this.cartItems.count();
        if (count !== expectedCount) {
            throw new Error(`Expected ${expectedCount} items in cart, but got ${count}`);
        }
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}