import { useEffect } from "react";

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets the document title and meta description/OG tags for the current
 * route. No router dependency — plain DOM so it works during static builds.
 */
export default function SEO({ title, description, path = "/" }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Jayanth Technologies` : "Jayanth Technologies | IT Services & Digital Solutions";
    document.title = fullTitle;

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, "property");
      setMeta("twitter:description", description);
    }
    setMeta("og:title", fullTitle, "property");
    setMeta("twitter:title", fullTitle);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://www.jayanthtechnologies.com${path}`);
  }, [title, description, path]);

  return null;
}
