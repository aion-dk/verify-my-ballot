import 'cypress-plugin-tab'
import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      tab(opts?: { shift: boolean }): Chainable<Element>
      testBallotFlow(boardSlug?: string): Chainable<Element>
    }
  }
}
