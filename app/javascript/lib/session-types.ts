export const sessionTypes = [
  { value: "quick_tutoring", suggestedDurations: ["0.5", "1", "1.5"] },
  { value: "deep_study", suggestedDurations: ["2", "3", "4", "6"] },
  { value: "project_collab", suggestedDurations: ["4", "6", "8", "12", "24"] },
  { value: "workshop", suggestedDurations: ["2", "3", "4"] },
  { value: "study_group", suggestedDurations: ["1.5", "2", "3"] },
  { value: "discussion", suggestedDurations: ["1", "1.5", "2"] },
];

// This helper function now lives here as well.
export const getDurationOptions = (sessionType: string) => {
  const selectedType = sessionTypes.find((type) => type.value === sessionType);
  if (!selectedType) return [];

  const durationMap: { [key: string]: string } = {
    "0.5": "30 minutes",
    "1": "1 hour",
    "1.5": "1.5 hours",
    "2": "2 hours",
    "3": "3 hours",
    "4": "4 hours",
    "6": "6 hours",
    "8": "8 hours",
    "12": "12 hours",
    "24": "1 day",
  };

  return selectedType.suggestedDurations.map((duration) => ({
    value: duration,
    label: durationMap[duration] || `${duration} hours`,
  }));
};
