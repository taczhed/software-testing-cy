export const productSelectors = {
  productInfo: 'div.productinfo.text-center',
  productImageWrapper: 'div.product-image-wrapper',
  addToCartLink: 'a.add-to-cart',
  cartTable: 'table#cart_info_table',
  tableCellDescription: 'td.cart_description a',
  tableCellQuantity: 'td.cart_quantity',
  tableCellDelete: 'a.cart_quantity_delete',
  cartEmptyInfo: 'span#empty_cart',
  searchProductInput: 'input#search_product',
  searchProductSubmit: 'button#submit_search',
  productCartLink: 'a[href="/view_cart"]',
} as const;
