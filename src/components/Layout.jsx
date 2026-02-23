import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="app-container" role="main">
      <header className="app-header" role="banner">
        <h1>Service Request Management</h1>
        <nav aria-label="Main navigation">
          <Link to="/" className="nav-link">Overview</Link>
        </nav>
      </header>
      <main className="app-main">
        {children}
      </main>
    </div>
  );
}

export default Layout;
