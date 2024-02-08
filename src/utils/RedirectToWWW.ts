export const redirectToWWW = () => {
	if (process.env.NODE_ENV === "production") {
		const currentUrl = window.location.href;
		// Check if the URL doesn't start with 'www.'
		if (!currentUrl.startsWith('https://www.')) {
			// Redirect to the URL with 'www.'
			window.location.href = currentUrl.replace('https://', 'https://www.');
		}
	}
};