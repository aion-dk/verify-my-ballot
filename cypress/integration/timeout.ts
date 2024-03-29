import { AVVerifier } from '@aion-dk/js-client'
import { TIMEOUT_RETRIES, MOCK_RESPONSE_MS } from '../../src/constants'

const LONGER_THAN_TIMEOUT = (TIMEOUT_RETRIES + 1) * 1000
const url = `http://localhost:3005/us`

it('respects timeout on ballot found...', () => {
  cy.visit(url, {
    onLoad(win) {
      cy.stub((win as any).client as AVVerifier, 'pollForSpoilRequest').returns(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('mock-spoil-request')
          }, LONGER_THAN_TIMEOUT)
        })
      )
    },
  })

  cy.contains('h1', 'Welcome to the VerifyMyBallot Site')

  cy.get('[data-cy=get-started-button]').click()

  cy.contains('h1', 'Find my ballot')

  cy.get('[data-cy=ballot-checking-code]').clear().type('12345')

  cy.get('[data-cy=find-ballot-submit]').click()

  cy.location('pathname').should('eq', '/us/ballot-found')

  cy.wait(MOCK_RESPONSE_MS / 2).then(() => {
    cy.get('[data-cy=timeout-modal]', { timeout: 1000 }).should('exist')

    cy.contains('Tap the Code entered button in the Mark.It app.')

    cy.location('pathname', { timeout: LONGER_THAN_TIMEOUT }).should(
      'eq',
      '/us/expired'
    )

    cy.contains('h1', 'Session expired')

    cy.get('[data-cy=reset-button]').click()

    cy.location('pathname').should('eq', '/us')
  })
})
