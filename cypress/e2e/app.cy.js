/// <reference types="cypress" />

const selectors = {
  theme_switch: '[data-testid="theme_switch"]',
  app_container: '[data-testid="app_container"]',
  home_container: '[data-testid="home_container"]',
  country_search: '[data-testid="country_search"]',
  regions_filter: '[data-testid="regions"]',
  countries_list: '[data-testid="countries_list"]',
  details_container: '[data-testid="details_container"]',
  back_button: '[data-testid="back_button"]',
  border_countries: '[data-testid="border_countries"]',
  border_countries_list: '[data-testid="border_countries_list"]',
  empty_state_container: '[data-testid="empty_state_container"]',
};

describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders without crashing", () => {
    cy.get(selectors.app_container).should("exist");
  });

  it("toggles the theme", () => {
    cy.get(selectors.theme_switch).click();
    cy.get('[aria-label="Switch to dark mode"]').should("exist");
  });

  it("displays the search input and region filter", () => {
    cy.get(selectors.country_search).should("exist");
    cy.get(selectors.regions_filter).should("exist");
  });

  it("fetches and displays countries", () => {
    cy.intercept("GET", "/v3.1/*").as("getData");

    cy.wait("@getData");

    cy.get(selectors.countries_list).should("have.length.above", 0);
  });

  it("searches for a country", () => {
    cy.get(selectors.country_search).type("Germany");
    cy.get(selectors.home_container).contains("Germany").should("be.visible");

    cy.contains("Countries in the world - 1 country").should("be.visible");
  });

  it("filters countries by region", () => {
    cy.get(selectors.regions_filter).select("Europe");
    cy.get(selectors.home_container).contains("Europe").should("be.visible");
  });

  it("navigates to country details when a card is clicked", () => {
    cy.get('[data-testid="deu"]').click();
    cy.url().should("include", "/deu");
    cy.get(selectors.details_container).should("exist");
    cy.get(selectors.border_countries).should("exist");
  });

  it("navigates to the first border country when clicked", () => {
    cy.get('[data-testid="deu"]').click();
    cy.url().should("include", "/deu");
    cy.get(selectors.details_container).should("exist");
    cy.get(selectors.border_countries).should("exist");

    cy.get(selectors.border_countries_list).find("li").first().click();
    cy.url().should("include", "/nld");

    // navigates back when the Back button is clicked
    cy.get(selectors.back_button).click();
    cy.url().should("contain", "/deu");
  });
});

describe("Error", () => {
  it("renders error page without crashing", () => {
    cy.visit("/deut");
    cy.get(selectors.empty_state_container).should("exist");

    cy.wait(Cypress.config("pageLoadTimeout"));
    cy.contains("An error occured. Please try again.").should("be.visible");
  });
});
