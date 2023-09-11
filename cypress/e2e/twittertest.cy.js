describe('Twitter App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/')
    })
  
    it('should display tweets in the "All" tab', () => {
      cy.get('[data-testid="tweet"]').should('have.length.gte', 1)
    })
  
    it('should switch between tabs', () => {
      cy.contains('Liked').click()
      cy.contains('All').click()
    })
  
    it('should like and unlike a tweet', () => {
      cy.get('[data-testid="like-button"]').click()
      cy.get('[data-testid="counter"]').should('have.text', '1');
      cy.contains('Liked').click()
      cy.get('[data-testid="unlike-button"]').click()
      cy.get('[data-testid="tweet"]').should('have.length.gte', 0)
      cy.get('[data-testid="counter"]').should('have.text', '0');

    })
  })
  