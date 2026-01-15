import{test, expect} from '@playwright/test';
import { ProductPage } from './product-page';
import { LoginPage } from './login-page';
import products from './products.json';

    test.describe('Cart Data-Driven Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  for (const product of products) {
    test(`should add ${product.name} to the cart`, async ({ page }) => {
      const productPage = new ProductPage(page);

      // Add product dynamically using product ID
      await productPage.addProductToCartById(product.locatorId);

      // Get cart count from header (shopping cart badge)
      const cartBadge = page.locator('.shopping_cart_badge');

      // Assert cart count is 1
      await expect(cartBadge).toHaveText('1');
    });
  }
});
