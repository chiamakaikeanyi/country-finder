import React, { Fragment, ReactNode } from "react";
import { Helmet } from "react-helmet";
import Header from "../Header/Header";

import "./Layout.scss";
import { composeClass } from "../../utils";

const Layout: React.FC<{
  children: ReactNode;
  customClass?: string;
  metaTitle?: string;
  metaDescription?: string;
}> = ({ children, customClass, metaTitle, metaDescription }) => {
  return (
    <Fragment>
      <Helmet>
        <title>
          {metaTitle ? `${metaTitle} - Country Finder` : "Country Finder"}
        </title>
        <meta
          name="description"
          content={
            metaDescription
              ? metaDescription
              : "Discover countries around the world"
          }
        />
        ‍
      </Helmet>

      <div
        className={
          customClass ? composeClass("container", customClass) : "container"
        }
      >
        <a href="#main" className="skip-to-main-content">
          Skip to main content
        </a>

        <Header />

        <main id="main" className="main-content">
          {children}
        </main>
      </div>
    </Fragment>
  );
};

export default Layout;
