import * as React from "react";

import Header from "./header";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header"><Header /></header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Michael L Perry
      </footer>
    </div>
  )
}

export default Layout
