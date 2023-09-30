/// <reference types="cypress" />
describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  // it('Shall navigate to DashBoard when successfully login', () => {
  //   cy.get('input[placeholder="Email"]').type('user1@user1.jp')
  //   cy.get('input[placeholder="Password"]').type('password123')
  //   cy.get('[type="submit"]').click()
  //   cy.get('[data-testid="logout"]').should('be.visible')
  // })
  // it('Shall navigate to Auth when logout clicked', () => {
  //   cy.get('input[placeholder="Email"]').type('user1@user1.jp')
  //   cy.get('input[placeholder="Password"]').type('password123')
  //   cy.get('[type="submit"]').click()
  //   cy.get('[data-testid="logout"]').should('be.visible')
  //   cy.get('[data-testid="logout"]').click()
  //   cy.get('input[placeholder="Email"]').type('user@user.jp')
  //   cy.get('input[placeholder="Password"]').type('password')
  // })
  // it('Shall not navigate to DashBoard with wrong credentials', () => {
  //   cy.get('input[placeholder="Email"]').type('user3@user.jp')
  //   cy.get('input[placeholder="Password"]').type('password123')
  //   cy.get("[type='submit']").click()
  //   cy.get('[data-testid="logout"]').should('not.exist')
  // })

  it('Shall navigate to DashBoard when successfully registered', () => {
    cy.get('input[placeholder="Email"]').type('user6@user6.jp')
    cy.get('input[placeholder="Password"]').type('password111')
    cy.contains('change mode ?').click()
    cy.get("[type='submit']").should('have.text', 'Register')
    cy.get("[type='submit']").click()
    cy.get('input[placeholder="Username"]').should(
      'have.value',
      'user6@user6.jp',
    )
  })
})
export {}
