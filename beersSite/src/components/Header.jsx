import { Link } from "react-router-dom";

const Header = () => {
  const navigationLinks = [
    { title: "Home", slug: "/" },
    { title: "Beers", slug: "/beers" },
    { title: "Register", slug: "/register" },
    { title: "Login", slug: "/login" },
  ];

  return (
    <header className="header">
      <nav>
        <ul className="listHeader">
          {navigationLinks.map((link, idx) => (
            <Link key={idx} to={link.slug}>
              <li className="headerLink">{link.title}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
