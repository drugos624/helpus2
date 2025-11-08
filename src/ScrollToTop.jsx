import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // vai in alto
  }, [pathname]); // ogni volta che cambia la route

  return null; // non renderizza nulla
}

export default ScrollToTop;
