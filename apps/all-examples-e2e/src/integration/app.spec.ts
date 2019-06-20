import { getGreeting } from '../support/app.po';

describe('all-examples', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to all-examples!');
  });
});
