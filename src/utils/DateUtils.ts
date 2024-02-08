export function getFormattedTodayDate() {
	const today = new Date();

	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(today.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

export function formatDate(date: Date): string {
	const newDate = new Date(date);
	const year: number = newDate.getFullYear();
	const month: string = String(newDate.getMonth() + 1).padStart(2, "0");
	const day: string = String(newDate.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

export function formatHours(date: Date): string {
	const newDate = new Date(date);
	const hours = newDate.getHours();
	const minutes = String(newDate.getMinutes()).padStart(2, "0");
	const meridiem = hours >= 12 ? "PM" : "AM";
	const formattedHours = (hours % 12 || 12) + ":" + minutes + " " + meridiem;
	return formattedHours;
};

export const getCurrentDate = (date: string): number => {
	return new Date(date).getDate();
};

export const getNewCurrentDate = (date: string): number => {
	let dateDay = date.split("-")[2]
	return Number(dateDay);
};

export const getCurrentDateFormated = () => {
	const timeFormated = new Date().toLocaleString('en-GB', {
		hour12: false,
	});
	return timeFormated
};

export function getCurrentMonthDays(): number[] {
	const date: Date = new Date();
	const year: number = date.getFullYear();
	const month: number = date.getMonth();
	const daysInMonth: number = new Date(year, month + 1, 0).getDate();
	const daysArray: number[] = Array.from(
		{ length: daysInMonth },
		(_, i) => i + 1
	);
	return daysArray;
};

export const getCurrentYear = (): number => {
	return new Date().getFullYear();
};

// HOURS SECTION


export function getHoursDiff(startDate: Date, endDate: Date): number {
	const diffInMs: number = Math.abs(endDate.getTime() - startDate.getTime());
	const diffInHours: number = Math.ceil(diffInMs / (1000 * 60 * 60));
	return diffInHours;
};

export const getTimeDifference = (timestamp: string): string => {
	const currentTime = new Date();
	const givenTime = new Date(timestamp);
	let now = currentTime.getTime() + 3600000;
	let time = givenTime.getTime();
	let diff = now - time;
	let hours = Math.floor(diff / 1000 / 60 / 60);
	diff -= hours * 1000 * 60 * 60;
	let minutes = Math.floor(diff / 1000 / 60);
	diff -= minutes * 1000 * 60;
	let seconds = Math.floor(diff / 1000);
	diff -= seconds * 1000;
	if (hours > 0) {
		return `${hours} Hr`;
	} else if (minutes > 0) {
		return `${minutes} Min`;
	} else {
		return `${seconds} Sec`;
	}
};


export const getTimeRemainingUntilWorkStarts = (startTime: string): string => {
	const now = new Date();
	const currentHour = now.getHours();
	const currentMinute = now.getMinutes();

	if (startTime) {
		const [startHour, startMinute] = startTime.split(':').map(Number);

		if (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) {
			const elapsedTime = (currentHour - startHour) * 60 + (currentMinute - startMinute);
			const elapsedHours = Math.floor(elapsedTime / 60);
			const elapsedMinutes = elapsedTime % 60;
			return `Late By: ${elapsedHours < 10 ? `0${elapsedHours}` : elapsedHours}:${elapsedMinutes} `;
		}

		const remainingHours = startHour - currentHour;
		const remainingMinutes = startMinute - currentMinute;

		return `Work starts In: ${remainingHours < 10 ? `0${remainingHours}` : remainingHours}:${remainingMinutes} `;
	} else return ' '
};


export const getCurrentTimestamp = (): string => {
	const now = new Date();
	const timestamp = now.toISOString(); // Format: "2023-10-15T11:29:57.568Z"
	return timestamp.replace("T", " ").split(".")[0]; // Format: "2023-10-15 11:29:57"
};