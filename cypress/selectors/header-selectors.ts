export const headerSelectors = {
  logo: 'img[alt="Website for automation practice"]',
  navbar: 'ul.navbar-nav',
  productsLink: 'header a[href="/products"]',
  loginLink: 'header a[href="/login"]',
  logoutLink: 'header a[href="/logout"]',
  viewCartLink: 'header a[href="/view_cart"]',
  contactLink: 'header a[href="/contact_us"]',
} as const;
