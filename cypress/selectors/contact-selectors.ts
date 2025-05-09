export const contactSelectors = {
  contactForm: 'form#contact-us-form',
  nameInput: 'input[data-qa="name"]',
  emailInput: 'input[data-qa="email"]',
  subjectInput: 'input[data-qa="subject"]',
  messageInput: 'textarea[data-qa="message"]',
  submitButton: 'input[data-qa="submit-button"]',
  successAlert: 'div.status.alert-success',
} as const;
