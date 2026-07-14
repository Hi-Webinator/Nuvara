/**
 * Returns the props needed to make a non-semantic element (e.g. a styled
 * <span>) behave like an accessible button: it is focusable, exposes a
 * button role to assistive tech, and activates on both click and the
 * Enter / Space keys.
 *
 * Used instead of swapping the element for a real <button> so the existing
 * design (which relies on element-specific styling) stays intact.
 *
 * @param {() => void} onActivate - handler to run on click or keyboard activation
 * @returns {object} spreadable props
 */
export const activate = (onActivate) => ({
  role: "button",
  tabIndex: 0,
  onClick: onActivate,
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActivate();
    }
  },
});
