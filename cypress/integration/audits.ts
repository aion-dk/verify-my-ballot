/// <reference types="cypress-audit" />

import { AVVerifier } from '@aion-dk/js-client'
import { MOCKED_BALLOTS_DB } from '../../src/MockVerifierClient'

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
    cy.pa11y()
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
  it('has acceptable audit for unsealed ballot screen', () => {
    cy.visit('http://localhost:3000/unsealed-ballot', {
      onLoad(win) {
        cy.stub((win as any).client as AVVerifier, 'decryptBallot').returns(
          MOCKED_BALLOTS_DB['12345']
        )
      },
    })
    cy.lighthouse(thresholds)
    cy.pa11y()
  })
  it('has acceptable audit for finish screen', () => {
    cy.visit('http://localhost:3000/finish')
    cy.lighthouse(thresholds)
    cy.pa11y()
  })
})
