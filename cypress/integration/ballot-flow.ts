describe('Ballot flow', () => {
  it('can complete the basic ballot flow', () => {
    cy.testBallotFlow('us')
  })
  it('can complete the basic ballot flow with a different board (multitenancy)', () => {
    cy.testBallotFlow('dk')
  })
})
