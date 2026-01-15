import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.pageTitle = page.locator('.title');
  }

  // Action: Add product to cart using dynamic product ID
  async addProductToCartById(productId: string): Promise<this> {
    const addToCartButton = this.page.locator(
      `[data-test="add-to-cart-${productId}"]`
    );

    await addToCartButton.click();
    return this;
  }

  // Action: Navigate to shopping cart
  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  // Getter: Get inventory page title
  async getPageTitle(): Promise<string | null> {
    return await this.pageTitle.textContent();
  }
}
