/**
 * Capitalizes the first letter of the given string and makes all other letters lowercase.
 * @param {string} text - The string to be formatted.
 * @returns {string} - The formatted string with the first letter capitalized.
 */
export const capitalize = (text: string): string => {
	if (!text) return text;
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
