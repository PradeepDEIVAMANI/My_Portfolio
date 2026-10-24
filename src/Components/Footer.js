import React from "react";
import ArrowIcon from "./ArrowIcon";
import { withTranslations } from "../i18n";
import ResumeMenu from "./ResumeMenu";

function Footer() {
  return <footer className="site-footer"><div className="footer-inner"><a className="brand" href="#about"><span className="brand-mark">PD</span><span>Pradeep <span className="brand-muted">Deivamani</span></span></a><div className="footer-links"><a href="https://github.com/PradeepDEIVAMANI" target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a><a href="https://www.linkedin.com/in/pradeep-deivamani-86a01417b/" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a><ResumeMenu footer /></div><span className="copyright">© {new Date().getFullYear()} · Made with care in Paris</span></div></footer>;
}

export default withTranslations(Footer);
