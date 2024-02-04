// Assuming submissionCalendarString is the JSON string from the input


function previousTimestamp() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight
  return new Date(today.getTime());
}


// // console.log(previousTimestamp());
// submissionCalendarString = "{ \"1706572800\": 0, \"1706659200\": 0, \"1706745600\": 0}"
// ;
 function getStreak(submissionCalendarString){
  const innerCalendarString = submissionCalendarString.submissionCalendar;
  // console.log(innerCalendarString);
  const innerCalendar = JSON.parse(innerCalendarString);
  // console.log(innerCalendar);

  const dateArray = Object.keys(innerCalendar).map(timestamp => new Date(timestamp * 1000));
  
  // console.log(dateArray);
// console.log(dateArray);
// // Sort the array in ascending order
dateArray.sort((a, b) => a - b);
// console.log(dateArray);

let streak = 0;
let currentStreak = 0;

// // Iterate through the sorted dates
// console.log(dateArray.length);
for (let i = 1; i < dateArray.length; i++) {
    const diffInSeconds = Math.floor((dateArray[i] - dateArray[i - 1]) / 1000);
  // console.log(diffInSeconds);
  if (diffInSeconds <= 86400) {
    currentStreak++;
  } else {
    // Update streak if the current streak is greater
          currentStreak = 0; // Reset currentStreak
  }
}
console.log(currentStreak);
const previousTimestampValue = previousTimestamp();
// // console.log(previousTimestampValue);
  const todayTS = previousTimestampValue;
  // console.log(dateArray[dateArray.length-1]);
  // console.log(todayTS);
  console.log(Math.floor(todayTS-dateArray[dateArray.length-1])/1000);
  
 if(Math.floor(todayTS-dateArray[dateArray.length-1])/1000===0){
  console.log("this is executed1");
  }
  else if(Math.floor(todayTS-dateArray[dateArray.length-1])/1000<=86400){
    currentStreak++;
    console.log("this is executed2");
   
  }
  else{
    console.log("this is executed3");
   currentStreak=0;
    
  }
  console.log(currentStreak);
  return currentStreak;

}

export{getStreak};