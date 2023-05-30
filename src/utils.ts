/**
 * Combines a number of styles
 * @param {String} styles Classes/Styles to be applied
 * @returns {String} Combined classes
 */
export const classNames = (...styles: string[]) => {
  let classes = "";

  styles.forEach((arg) => {
    if (arg) {
      classes += `${arg} `;
    }
  });

  return classes.trim();
};
