describe('Home Page', () => {

    it('Should display a list of courses', () => {
        cy.visit('/');
        cy.contains('All Courses');

    })

})
