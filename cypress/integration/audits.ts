/// <reference types="cypress-audit" />

const thresholds: Cypress.LighthouseThresholds = {
  accessibility: 100,
  'best-practices': 100,
}

context('Page audits', () => {
  it('has acceptable audit for getting started page', () => {
    cy.visit('http://localhost:3000')
    cy.lighthouse(thresholds)
    cy.pa11y()
  })
  it('has acceptable audit for about page', () => {
    cy.visit('http://localhost:3000/about')
    cy.lighthouse(thresholds)
    cy.pa11y()
  })
  it('has acceptable audit for faq page', () => {
    cy.visit('http://localhost:3000/faq')
    cy.lighthouse(thresholds)
    cy.pa11y()
  })
  it('has acceptable audit for find my ballot page', () => {
    cy.visit('http://localhost:3000/find-my-ballot')
    cy.lighthouse(thresholds)
    cy.pa11y() // TODO: Pa11y fails here, but due to design - not the coding/implementation thereof
  })
  it('has acceptable audit for ballot found page', () => {
    cy.visit('http://localhost:3000/ballot-found')
    cy.lighthouse(thresholds)
    cy.pa11y()
  })
  it('has acceptable audit for passkey screen', () => {
    cy.visit('http://localhost:3000/passkey/12345')
    cy.lighthouse(thresholds)
    cy.pa11y()
  })
  it('has acceptable audit for finish screen', () => {
    cy.visit('http://localhost:3000/finish')
    cy.lighthouse(thresholds)
    cy.pa11y()
  })
})
