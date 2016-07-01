describe('Pas ce soir !', function() {
  beforeEach(function() {
    cy.visit('/');
  });
  it('assert that <title> is correct', function() {
    cy.title().should('include', 'Pas Ce Soir')
  });

  it('assert the DOM', function() {
    cy.get('.action-container').children()
      .should('have.length', 4)
      .should('have.class', 'action')
      .should(function(childrenList) {
        var $childrenTexts = childrenList.map(function(_, child) {
          return Cypress.$(child).text();
        });
        var childrenTexts = $childrenTexts.get();
        expect(childrenTexts).to.have.length(4);
        expect(childrenTexts).to.deep.eq([
          'Pas ce soir',
          'Pas maintenant',
          'Pas aujourd\'hui',
          'Touche pas',
        ]);
      });

    cy
      .get('.action-container')
        .contains('Pas ce soir').should('have.class', 'action--pas-ce-soir')
      .get('.action-container')
        .contains('Pas maintenant').should('have.class', 'action--pas-maintenant')
      .get('.action-container')
        .contains('Pas aujourd\'hui').should('have.class', 'action--pas-aujourdhui')
      .get('.action-container')
        .contains('Touche pas').should('have.class', 'action--touche-pas');
  });

  it.skip('assert click on actions', function() {
    function assertClickOnAction(actionClassName) {
      cy.get(`.${actionClassName}`).click().should('have.class', 'playing').then(function($el){
        cy.wrap($el, {timeout: 5000}).should('not.have.class', 'playing')
      })
    }

    ['action--pas-ce-soir',
     'action--pas-maintenant',
     'action--pas-aujourdhui',
     'action--touche-pas'].forEach(actionClassName => assertClickOnAction(actionClassName));
  });
});
