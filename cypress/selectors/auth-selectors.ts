export const signupSelectors = {
  signupFrom: 'form[action="/signup"]',
  signupNameInput: 'input[data-qa="signup-name"]',
  signupEmailInput: 'input[data-qa="signup-email"]',
  signupButton: 'button[data-qa="signup-button"]',
  createAccountButton: 'button[data-qa="create-account"]',
  accountCreatedInfo: 'h2[data-qa="account-created"]',
  continueButton: 'a[data-qa="continue-button"]',
} as const;

export const loginSelectors = {
  loginFrom: 'form[action="/login"]',
  loginEmailInput: 'input[data-qa="login-email"]',
  loginPasswordInput: 'input[data-qa="login-password"]',
  loginButton: 'button[data-qa="login-button"]',
} as const;
