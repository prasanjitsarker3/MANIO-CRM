// generateMonthRange.ts
import dayjs from "dayjs";

// Function to generate months for the range 5 months before to 5 months after
export const generateMonthRange = (currentMonth: string) => {
  const monthsArray = [];
  const currentDate = dayjs(currentMonth);

  // Generate months from 5 months before to 5 months after
  for (let i = -5; i <= 5; i++) {
    const month = currentDate.add(i, "month");
    monthsArray.push({
      value: month.format("MMMM YYYY"), // Example: "January 2024"
      label: month.format("MMMM YYYY"), // Example: "January 2024"
    });
  }
  return monthsArray;
};

// Get current month in format "MMMM YYYY"
export const currentMonth = dayjs().format("MMMM YYYY");

// Generate the range of months (5 before to 5 after)
export const months = generateMonthRange(currentMonth);
