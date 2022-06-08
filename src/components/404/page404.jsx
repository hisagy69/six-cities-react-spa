import React from 'react';
import {Link} from 'react-router-dom';
const Page404 = () => (
  <React.Fragment>
    <section className="error">
      <div className="container">
        <h1 className="error-header">404 not found</h1>
        <Link to="/">На главную</Link>
      </div>
    </section>
  </React.Fragment>
);
export default Page404;
