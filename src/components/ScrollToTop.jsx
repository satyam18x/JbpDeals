import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the page immediately on path change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Using instant for a better 'new page' feel as requested
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
