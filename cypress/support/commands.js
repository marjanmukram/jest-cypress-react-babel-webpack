import {buildUser} from '../support/generate'

Cypress.Commands.add('createUser', overrides => {
  const user = buildUser(overrides)
  cy.request({
    url: 'http://localhost:3000/register',
    method: 'POST',
    body: user,
  }).then(response => ({...response.body.user, ...user}))
})

Cypress.Commands.add('login', user => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/login',
    body: user,
  }).then(response => {
    window.localStorage.setItem('token', response.body.user.token)
  })
})

Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`)
})

Cypress.Commands.add('assertIsLoggedIn', user => {
  cy.window()
    .its('localStorage.token')
    .should('be.a', 'string')
  cy.findByTestId('username-display').should('have', user.username)
})
