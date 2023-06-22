import React from "react";
import { mount } from "cypress/react18";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Details from "../../src/pages/Details/Details";

const selectors = {
  details_container: '[data-testid="details_container"]',
};

describe("Details", () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient();

    mount(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/deu"]}>
          <Routes>
            <Route path=":countryCode" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  it("renders without crashing", () => {
    cy.get(selectors.details_container).should("exist");
  });

  it("displays country details correctly", () => {
    cy.get('[data-testid="deu"]')
      .scrollIntoView();
    cy.contains("Germany").should("be.visible");
    cy.contains("Native Name:").should("be.visible");
    cy.contains("Population").should("be.visible");
    cy.contains("Region").should("be.visible");
    cy.contains("Sub Region").should("be.visible");
    cy.contains("Capital").should("be.visible");
    cy.contains("Top Level Domain").should("be.visible");
    cy.contains("Currencies").should("be.visible");
    cy.contains("Languages").should("be.visible");
    cy.contains("Driver's Side").should("be.visible");
    cy.contains("Timezone(s)").should("be.visible");
  });
});
