export function filterData(
	data: any[],
	selectedTerm: string,
	searchValue: string
): any[] {
	return data?.filter((row) => {
		switch (selectedTerm) {
			case "name":
				return row?.user?.name!.toLowerCase().includes(searchValue.toLowerCase());
			case "code":
				return row.code.toLowerCase().includes(searchValue.toLowerCase());
			case "date":
				return row.date.toLowerCase().includes(searchValue.toLowerCase());
			default:
				return true; // Return all items if no specific term is selected
		}
	});
}
