export const stripHtml = string => {
	if (!string) {
		return '';
	}

	return string.replace(/(<([^>]+)>)/ig, '');
};
