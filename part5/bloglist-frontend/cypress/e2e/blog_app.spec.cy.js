describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'John Cena',
      username: 'JCena',
      password: '5Knuckles',
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown on first visit', function () {
    cy.contains('Log in to Bloglist');
    cy.get('#login-form');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('JCena');
      cy.get('#password').type('5Knuckles');
      cy.get('#login-button').click();

      cy.contains('John Cena has logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('JCena');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.notification-message')
        .should('contain', 'Unable to log in')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'JCena',
        password: '5Knuckles',
      }).then((response) => {
        localStorage.setItem('blogLoggedInUser', JSON.stringify(response.body));
        cy.visit('http://localhost:3000');
      });
    });

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'test title',
        author: 'test author',
        url: 'fakeurl',
      });

      cy.get('.blogItem').should('have.length', 1);
    });

    it('A blog can be liked', function () {
      cy.createBlog({ title: 'first blog', author: 'john', url: 'fakeurl' });
      cy.get('.blogItem').contains('view').click();
      cy.get('.moreInfo')
        .contains('like')
        .click()
        .parent()
        .should('contain', 'likes 1');
    });

    it('User can delete blog they created', function () {
      cy.createBlog({ title: 'first blog', author: 'john', url: 'fakeurl' });
      cy.get('.blogItem').contains('view').click();
      cy.get('.moreInfo').contains('remove').click();
      cy.get('.blogItem').should('not.exist');
    });

    it('Blogs are ordered according to likes', function () {
      cy.createBlog({
        title: 'least liked blog',
        author: 'john',
        url: 'fakeurl',
      });
      cy.createBlog({
        title: 'most liked blog',
        author: 'john',
        url: 'fakeurl',
      });
      cy.get('.blogItem').eq(1).as('mostLiked');
      cy.get('.blogItem').eq(0).as('leastLiked');
      cy.get('@mostLiked')
        .contains('view')
        .click()
        .parent()
        .contains('like')
        .click()
        .click();
      
      cy.get(".blogItem").eq(0).should("contain", "most liked blog")
      cy.get(".blogItem").eq(1).should("contain", "least liked blog")
    });
  });
});
