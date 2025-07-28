import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPageView } from "./analytics";

const AnalyticsHandler = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

export default AnalyticsHandler;
