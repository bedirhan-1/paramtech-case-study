/**
 * Capitalizes the first letter of the given string and makes all other letters lowercase.
 * @param {string} text - The string to be formatted.
 * @returns {string} - The formatted string with the first letter capitalized.
 */
export const capitalize = (text: string): string => {
	if (!text) return text;
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Formats the district and city from the given item by capitalizing the first letter of each.
 * @param {object} item - An object containing district and city information.
 * @returns {string} - Formatted district/city information.
 */
export const formatDistrictCity = (item: {
	district: string;
	city: string;
}): string => {
	const district = capitalize(item.district);
	const city = capitalize(item.city);

	return `${district}/${city}`;
};
