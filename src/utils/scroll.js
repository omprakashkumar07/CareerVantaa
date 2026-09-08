/**
 * Smoothly scrolls to an element by its ID, accounting for a fixed navbar height.
 * 
 * @param {Event} e - Optional event to prevent default
 * @param {string} targetId - The ID of the element to scroll to (with or without #)
 * @param {number} offset - Additional offset if needed (default 80 for navbar)
 */
export const scrollToSection = (e, targetId, offset = 80) => {
  if (e) {
    e.preventDefault();
  }

  // Handle cross-page navigation if not on home page
  if (window.location.pathname !== '/') {
    window.location.href = '/#' + targetId;
    return;
  }

  // Handle 'top' explicitly
  if (targetId === 'top' || targetId === '#top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const id = targetId.startsWith('#') ? targetId.slice(1) : targetId;
  const element = document.getElementById(id);

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
