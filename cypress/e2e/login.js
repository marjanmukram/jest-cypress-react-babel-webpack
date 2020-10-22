import {buildUser} from '../support/generate'

describe('user should able to login', () => {
  it('should register a new user', () => {
    const user = buildUser()
    cy.request({
      url: 'http://localhost:3000/register',
      method: 'POST',
      body: user,
    })
    cy.visit('/')

    cy.findByText(/login/i).click()
    cy.findByLabelText(/username/i).type(user.username)
    cy.findByLabelText(/password/i).type(user.password)
    cy.findByText(/submit/i)
      .click()
      .url()
      .should('eq', `${Cypress.config().baseUrl}/`)
  })
})
