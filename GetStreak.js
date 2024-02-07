// Assuming submissionCalendarString is the JSON string from the input


function previousTimestamp() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight
  return new Date(today.getTime());
}


function getStreak(submissionCalendarString) {
  const innerCalendarString = submissionCalendarString.submissionCalendar;
  
  const innerCalendar = JSON.parse(innerCalendarString);
 

  const dateArray = Object.keys(innerCalendar).map(timestamp => new Date(timestamp * 1000));


  dateArray.sort((a, b) => a - b);


  let streak = 0;
  let currentStreak = 0;

  // // Iterate through the sorted dates
  
  for (let i = 1; i < dateArray.length; i++) {
    const diffInSeconds = Math.floor((dateArray[i] - dateArray[i - 1]) / 1000);

    if (diffInSeconds <= 86400) {
      currentStreak++;
    } else {
      // Update streak if the current streak is greater
      currentStreak = 0; // Reset currentStreak
    }
  }

  const previousTimestampValue = previousTimestamp();

  const todayTS = previousTimestampValue;

  return currentStreak;

}

export { getStreak };