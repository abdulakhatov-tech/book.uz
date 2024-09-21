// Utility to format time in mm:ss
export const formatTime = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

// Utility to format title to URL
export const formatTitleToUrl = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

export const formatPhoneNumber = (phoneNumber: string) => {
	// Remove any non-digit characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    // Check if the number has the correct length (9 digits after the country code)
    if (cleaned.length === 9) {
        return `+998 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`;
    } else if (cleaned.length === 12 && cleaned.startsWith('998')) {
        return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10, 12)}`;
    }

    return phoneNumber; // Return the original input if it doesn't match

};
