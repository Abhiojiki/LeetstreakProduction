import { getStreak} from "./GetStreak.js";

document.addEventListener('DOMContentLoaded', function () {
       // ... (existing code)
  
    // Add event listener for the user calendar
    document.getElementById('user-calendar-link').addEventListener('click', function () {
      // Open a new tab with the user's LeetCode calendar
      chrome.tabs.create({ url: 'https://leetcode.com/calendar/' });
    });
 


    // ... (existing code)
  
    // Add event listener for the link to today's daily challenge
    document.getElementById('daily-challenge-link').addEventListener('click', function () {
      // Open a new tab with today's daily challenge
      chrome.tabs.create({ url: 'https://leetcode.com/AbhinavB1203/' });
    });



  
let displayUser = document.getElementById('usernamedisplay');
  let newUserButtonClicked = false;
  document.getElementById('new-user-button').addEventListener('click', function () {
    newUserButtonClicked = true;
    toggleNewUserTextarea(); // Toggle visibility of the textarea
  });

//Toggle text area fucntion 
function toggleNewUserTextarea() {
  const textarea = document.getElementById('new-username');
  textarea.style.display = (textarea.style.display === 'none' || textarea.style.display === '') ? 'block' : 'none';
  
}


let storedUsername='' ;

storedUsername = localStorage.getItem('username');

if (storedUsername.trim() === ''  ){
  /* add statement to warn user to write his username 

     // Alert the user to enter a username
  */
  alert('Register as new user.');
  
}



document.getElementById('new-username').addEventListener('keypress', async function (event) {
    if (event.key === 'Enter') {
        const username = event.target.value.trim();
        // console.log(username);
        if (event.target.value.trim() === '') {
          // toggleNewUserTextarea(); 
          document.getElementById('no-username-warning').style.display = 'block';
         // Call the toggleNewUser function again
        }
        else{
        localStorage.setItem('username', `${username}`);
       storedUsername = localStorage.getItem('username');
       try{
       const userDataResponse = await fetch('https://requestserver.onrender.com/username');
       const userData = await userDataResponse.json();
        if (userData.errors && userData.errors.length > 0) { // Assuming the response will have an error property if the username is not found
         document.getElementById('invalid-username-warning').style.display = 'block';
       } else {
         console.log('Data for /username endpoint:', userData);
         console.log(storedUsername);
         document.getElementById('new-username').value = '';
         toggleNewUserTextarea();
         usernamedisplay.style.color = "83C0C1"; // Set a cool green color
         usernamedisplay.innerHTML = "Username: <strong>" + storedUsername + "</strong>";
         newUserButtonClicked = false; // Reset the flag
         sendUsername(storedUsername);
         addNewH3Element();
       }
      }
       catch(error){
         console.error('Error fetching data:', error);
       }

     
        }
    }
});


storedUsername = localStorage.getItem('username');
sendUsername(storedUsername);

function sendUsername(storedUsername){
fetch('https://requestserver.onrender.com/username', {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({ username: storedUsername }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error sending username:', error));

}

usernamedisplay.style.color = "83C0C1"; // Set a cool green color
usernamedisplay.innerHTML = "Username: <strong>" + storedUsername + "</strong>";
const  currentStreakCount = 0;

// Getting multiple fetch request after making post request above.
document.getElementById('fetch-data-button').addEventListener('click', async function () {
  await fetchDataForEndpoints();
});

async function fetchDataForEndpoints() {
  // const username = storedUsername; // Replace with the actual username

  try {
   

// Function to calculate the streak count
const response = await fetch('https://requestserver.onrender.com/username/calendar');
const submissionCalendar = await response.json();


// Calculate the streak count
const currentStreak= getStreak(submissionCalendar);

function addNewH3Element() {
  const newH3 = document.createElement('h3');
  newH3.innerText = 'Streak: ' + currentStreak;
  const newUserButton = document.getElementById('new-user-button');
  newUserButton.parentNode.insertBefore(newH3, newUserButton);
}
addNewH3Element();
// Display the streak count to the user



    // Fetch data for /username/daily endpoint
    // const dailyDataResponse = await fetch('http://localhost:3000/username/daily');
    // const dailyData = await dailyDataResponse.json();
    // console.log('Data for /username/daily endpoint:', dailyData);

    // // Fetch data for /username/submission endpoint
    // const submissionDataResponse = await fetch('http://localhost:3000/username/submission');
    // const submissionData = await submissionDataResponse.json();
    // console.log('Data for /username/submission endpoint:', submissionData);

  } catch (error) {
    console.error('Error fetching data:', error);

  }
}

  });
  