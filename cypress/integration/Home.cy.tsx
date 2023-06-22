import React from "react";
import { mount } from "cypress/react18";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import Home from "../../src/pages/Home/Home";

const selectors = {
  home_container: "[data-testid='home_container']",
};

describe("Home", () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    mount(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  it("renders without crashing", () => {
    cy.get(selectors.home_container).should("exist");
    cy.contains("Countries in the world - More than 200 countries").should(
      "be.visible"
    );
  });

  it("displays the countries", () => {
    cy.get('[data-testid="deu"]')
      .scrollIntoView();
    cy.contains("Germany").should("be.visible");
    cy.contains("Population: 83,240,525").should("be.visible");
    cy.contains("Region: Europe").should("be.visible");
    cy.contains("Capital: Berlin").should("be.visible");
  });
});
