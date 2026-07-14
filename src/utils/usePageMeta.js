import { useEffect } from "react";

const SITE_NAME = "Nuvara";

/**
 * Sets the document title and meta description for the current route.
 * Single-page apps share one static <head>, so without this every route
 * exposes the same title to users, browser history, and search crawlers.
 *
 * @param {{ title?: string, description?: string }} meta
 */
const usePageMeta = ({ title, description } = {}) => {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
};

export default usePageMeta;
