import { NavLink } from "react-router-dom";
import styles from "./NavLinks.module.css";

function NavLinks({ isMobile }) {
  return (
    <ul className={isMobile ? styles.vertNavLinks : styles.horizNavLinks}>
      <li>
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/product">Product</NavLink>
      </li>
      <li>
        <NavLink to="/login" className={styles.ctaLink}>
          Login
        </NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
