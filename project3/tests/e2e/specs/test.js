// https://docs.cypress.io/api/introduction/api.html

let user = {
  name: 'Jill Harvard',
  email: 'jill@harvard.edu',
  password: 'asdfasdf'
}

describe('App Test', () => {
  it('Tests the home page', () => {
    cy.visit('/')
    cy.contains('h2', 'Featured Maps')
  })

  it('Tests the Neutralizing Map page loads the right page', () => {
    cy.visit('/neutralizing')
    cy.contains('h2', 'Neutralizing Map')
  })

  it('Tests that the Neutralizing Map loads', () => {
    cy.contains('p', 'Note: Alaska borough-level vote data not yet available') // this should only show after the neutralizing map data downloads from the server 
    cy.get('svg.highcharts-root').should('exist'); // highcharts creates this SVG 
  })

  it('Tests the members only features for this page are not available', () => {
    cy.contains('h3', 'Neutralizing Map Specification:').should('not.exist')
  })

  it('Tests that the Muddy Map page loads the right page', () => {
    cy.visit('/muddy')
    cy.contains('h2', 'Muddy Map')
  })

  it('Tests that the Muddy Map loads', () => {
    cy.contains('p', 'Note: Alaska borough-level vote data not yet available') // this should only show after the muddy map data downloads from the server 
    cy.get('svg.highcharts-root').should('exist'); // highcharts creates this SVG 
  })

  it('Tests the members only features for this page are not available', () => {
    cy.contains('h3', 'Muddy Map specification:').should('not.exist')
  })


  it('Tests the login page loads', () => {
    cy.visit('/account')
    cy.contains('h2', 'Login')
  })

  // modified from https://github.com/susanBuck/e28/blob/master/zipfoods/tests/e2e/specs/account-page.js
  it('validates login', () => {
    cy.get('[data-test=email-input]').clear().type(user.email);
    cy.get('[data-test=password-input]').clear().type('bunk');
    cy.get('[data-test=login-button]').click();
    cy.contains('These credentials do not match our records');
  })

  it('lets a user log in', () => {
    cy.get('[data-test=email-input]').clear().type(user.email);
    cy.get('[data-test=password-input]').clear().type(user.password);
    cy.get('[data-test="login-button"]').should('exist');
    
    cy.get('[data-test=login-button]').click();
    cy.contains('[data-test="welcome-message"]', user.name);
  })



})
