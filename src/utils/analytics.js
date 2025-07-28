import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-S95HSJKL3J");
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
