import styles from "./PageNav.module.css";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Hamburger from "hamburger-react";
import { useState, useEffect } from "react";

function PageNav() {
  const [isOpen, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 750);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={styles.nav}>
      <Logo />
      {!isMobile && <NavLinks isMobile={isMobile} />}
      {isMobile && (
        <Hamburger label="Show menu" toggled={isOpen} toggle={setOpen} />
      )}
      {isMobile && isOpen && <NavLinks isMobile={isMobile} />}
    </nav>
  );
}

export default PageNav;
