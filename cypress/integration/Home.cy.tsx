import React from "react";
import { mount } from "cypress/react";

import Home from "../../src/pages/Home/Home";

const selectors = {
  container: "[data-testid='container']",
};

describe("<Home />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Home />);
    cy.get(selectors.container).should("be.visible");
  });
});
