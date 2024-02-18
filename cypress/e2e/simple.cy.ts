import singin from '../fixtures/example.json';

describe('react-burger', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('open ingredient modal', () => {
    cy.contains('Конструктор');
    cy.contains('Соберите бургер');

    cy.get('[data-testid=ingredient-link]').first().click();
    cy.get('[data-testid=modal]').contains('Детали ингредиента');
    cy.get('[data-testid=modal-close]').click();
    cy.get('[data-testid=modal-close]').should('not.exist');
  });

  it('Should drag bun and ingredient to constructor and get order', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093d"]').drag(
      '[data-testid="burger-bun"]'
    );
    cy.get('[data-testid="643d69a5c3f7b9001cfa0942"]').drag(
      '[data-testid="burger-ingredients"]'
    );

    cy.get('[data-testid="in643d69a5c3f7b9001cfa093d"]').should('be.visible');
    cy.get('[data-testid="in643d69a5c3f7b9001cfa0942"]').should('be.visible');

    cy.get('button').contains('Оформить заказ').click();

    cy.get('[name=email]').type(singin.email);
    cy.get('[name=password]').type(singin.password);
    cy.contains('button', 'Войти').click();

    cy.get('[data-testid="submit-button"]').click();

    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders").as(
      "getOrder"
    );
    cy.get('[class^=order-details_order-number]', { timeout: 20000 }).contains(/\d+/);

    cy.get('[data-testid="order-number"]').should("be.visible");
    cy.get('[data-testid=modal-close]').click();
    cy.get('[data-testid=modal-close]').should('not.exist');
  });
});
