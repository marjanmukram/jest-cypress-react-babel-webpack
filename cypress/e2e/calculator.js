describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
    // cy.get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
    cy.findByText(/^1$/).click()
    cy.findByText(/^\+$/)
      // .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(4)')
      .click()
    cy.findByText(/^4$/)
      // .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(4)')
      .click()
    cy.findByText(/^=$/)
      // .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(5)')
      // .pause()
      // .debug()
      // .then(subject=>{
      //   debugger
      //   return subject
      // })
      .click()
    // .get('.mNQM6vIr72uG0YPP56ow5')
    cy.findByTestId('total').should('have.text', '5')
  })
})

describe('authenticated calculator', () => {
  it('displays the user name', () => {
    cy.createUser().then(user => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/login',
        body: user,
      }).then(response => {
        window.localStorage.setItem('token', response.body.user.token)
      })
      cy.visit('/')
      cy.findByTestId('username-display').should('have.text', user.username)
      cy.findByText(/logout/i).click()
      cy.findByTestId('username-display').should('not.exist')
    })
  })
})
