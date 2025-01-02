export function calculateAge(birthDateString: string): {
  formattedDate: string;
  age: number;
} {
  // Convert the string to a Date object
  const birthDate = new Date(birthDateString);

  // Format the date to a meaningful string (e.g., "November 11, 1962")
  const formattedDate = birthDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate age
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--; // Subtract 1 if the birthday hasn't occurred yet this year
  }

  return { formattedDate, age };
}

export function formatDate(birthDateString: string) {
  // Convert the string to a Date object
  const birthDate = new Date(birthDateString);

  // Format the date to a meaningful string (e.g., "November 11, 1962")
  const formattedDate = birthDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
}
