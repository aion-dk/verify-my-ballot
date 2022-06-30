import { MOCK_RESPONSE_MS } from '../../src/constants'

context('Accessibility', () => {
  it.skip('can resize font sizes', () => {
    cy.visit('http://localhost:3000')

    // starts with default 16px
    cy.get('html').should('have.css', 'font-size', '16px')

    // can increase by 2px each click
    cy.get('[data-cy=increase-font-size]').click()
    cy.get('[data-cy=increase-font-size]').click()
    cy.get('html').should('have.css', 'font-size', '20px')

    // can decrease by 2px each click
    cy.get('[data-cy=decrease-font-size]').click()
    cy.get('[data-cy=decrease-font-size]').click()
    cy.get('html').should('have.css', 'font-size', '16px')
  })

  it('sets DOM active element (focus) to a meaningful header element when switching page', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-cy=get-started-button]').click()

    cy.focused().should('contain.text', 'Find my ballot')
  })

  it('can tab through the FAQ menus', () => {
    cy.visit('http://localhost:3000/faq')

    // Can focus and open the first question
    const firstQuestion = cy
      .get('[data-cy=faq-menu]')
      .children()
      .first()
      .focus()

    firstQuestion.should(
      'contain.text',
      'Where do I find my ballot tracking code?'
    )
    firstQuestion.type('{enter}').should('contain.text', 'Placeholder answer')

    // Can tab and open second question
    const secondQuestion = firstQuestion.tab()
    secondQuestion.should(
      'contain.text',
      'My ballot is not found. After I input the ballot tracking code, I am getting an error message.'
    )
    secondQuestion.type('{enter}').should('contain.text', 'Placeholder answer')

    // Can close the question again
    secondQuestion
      .type('{enter}')
      .should('not.contain.text', 'Placeholder answer')

    // Can tab multiple times and open last question
    const lastQuestion = secondQuestion.tab().tab().tab()
    lastQuestion.should(
      'contain.text',
      'I want to submit my ballot. What do I do?'
    )
    lastQuestion
      .type('{enter}')
      .should('contain.text', 'You must submit your ballot from')

    // Can cycle and wrap through the menus with the arrow keys

    // Press arrow up 4 times
    for (let i = 0; i < 4; i++) {
      cy.focused().trigger('keydown', {
        keyCode: 38,
        which: 38,
      })
    }

    // The focused menu should now be the first question, and still be open
    cy.focused()
      .should('contain.text', 'Where do I find my ballot tracking code?')
      .and('contain.text', 'Placeholder answer')

    // Press arrow up once
    cy.focused().trigger('keydown', {
      keyCode: 38,
      which: 38,
    })

    // It should now wrap around and be equivalent to the last question
    cy.focused()
      .should('contain.text', 'I want to submit my ballot. What do I do?')
      .and('contain.text', 'You must submit your ballot from')

    // Press arrow down twice
    for (let i = 0; i < 2; i++) {
      cy.focused().trigger('keydown', {
        keyCode: 40,
        which: 40,
      })
    }

    // Pressing two down arrow keys should now leave us at the second question
    cy.focused()
      .should(
        'contain.text',
        'My ballot is not found. After I input the ballot tracking code, I am getting an error message.'
      )
      .and('contain.text', 'Placeholder answer')
  })

  it('should change active element focus to modal upon opening it', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-cy=get-started-button]').click()

    cy.get('[data-cy=ballot-checking-code]').clear().type('12345')

    cy.get('[data-cy=find-ballot-submit]').click()

    cy.location('pathname').should('eq', '/ballot-found')

    // Wait till modal is open, and then check the actively focused element
    cy.wait(MOCK_RESPONSE_MS / 2).then(() => {
      cy.focused().should(
        'contain.text',
        'You have to confirm that the pairing codes match in the Mark.It app.'
      )
    })
  })
})
