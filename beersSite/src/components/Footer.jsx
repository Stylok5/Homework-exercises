import { Link } from "react-router-dom";

const Footer = () => {
  const navigationLinks = [
    { title: "Home", slug: "/" },
    { title: "Beers", slug: "/beers" },
    { title: "Register", slug: "/register" },
    { title: "Login", slug: "/login" },
  ];

  return (
    <header className="footer">
      <nav>
        <ul className="listFooter">
          {navigationLinks.map((link, idx) => (
            <Link key={idx} to={link.slug}>
              <li className="footerLink">{link.title}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Footer;
