import 'cypress-audit/commands'
import { MOCK_RESPONSE_MS } from '../../src/constants'

Cypress.Commands.add('testBallotFlow', (boardSlug = 'us') => {
  cy.visit(`http://localhost:3005/${boardSlug}`)

  cy.contains('h1', 'Welcome to the VerifyMyBallot Site')

  cy.get('[data-cy=get-started-button]').click()

  cy.contains('h1', 'Find my ballot')

  cy.get('[data-cy=ballot-checking-code]').clear().type('12345')

  cy.get('[data-cy=find-ballot-submit]').click()

  cy.location('pathname').should('eq', `/${boardSlug}/ballot-found`)

  cy.contains('h1', 'Ballot found')

  cy.location('pathname', { timeout: MOCK_RESPONSE_MS + 2000 }).should(
    'include',
    `/${boardSlug}/passkey/`
  )

  cy.contains('h1', 'Passkey')

  cy.get('[data-cy=pairing-code]').should('contain.text', '6z5VThK')

  cy.contains('h1', 'Unsealed ballot', { timeout: MOCK_RESPONSE_MS + 2000 })

  const ballotChoices = cy.get('[data-cy=ballot-choices]')
  ballotChoices.children().should('have.length', 3)

  ballotChoices.should('contain.text', 'Contest 1: Option A')
  ballotChoices.should('contain.text', 'Contest 2: Option B')
  ballotChoices.should('contain.text', 'Contest 3: Option C')

  cy.get('[data-cy=finish-button]').click()

  cy.contains('h1', 'Thank you for using the VerifyMyBallot site')
})
