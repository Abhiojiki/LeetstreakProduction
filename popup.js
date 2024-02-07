import { getStreak } from "./GetStreak.js";

document.addEventListener('DOMContentLoaded', function () {
  // Add event listeners for the user calendar and daily challenge links
  document.getElementById('user-profile').addEventListener('click', function () {
    openNewTab(`https://leetcode.com/${username}/`);
  });

  document.getElementById('daily-challenge-link').addEventListener('click', function () {
    openNewTab('https://leetcode.com/problemset/');
  });

  // // Initialize variables
  let storedUsername = '';


  // Event listener for the new user button
  document.getElementById('new-user-button').addEventListener('click', function () {
    toggleNewUserTextarea();
  });

  // Function to toggle the visibility of the new username textarea
  function toggleNewUserTextarea() {
    const textarea = document.getElementById('new-username');
    textarea.style.display = (textarea.style.display === 'none' || textarea.style.display === '') ? 'block' : 'none';
  }

  // Event listener for pressing Enter in the new username textarea
  let username = localStorage.getItem('username') || '';
  let newUserButtonClicked = false;
  document.getElementById('new-username').addEventListener('keypress', async function (event) {
    newUserButtonClicked = true;
    if (event.key === 'Enter') {
      username = event.target.value.trim();
      if (username === '') {
        document.getElementById('no-username-warning').style.display = 'block';
      } else {
        //Sending username to the server
        document.getElementById('no-username-warning').style.display = 'none';
        sendUsername(username);
        toggleNewUserTextarea();
        try {
          // Now getting user data  from server from already provided username.
          const userDataResponse = await fetchUserData();
         
          const userData = await userDataResponse.json();
          if (userData.errors && userData.errors.length > 0) {
            document.getElementById('invalid-username-warning').style.display = 'block';
            document.getElementById('new-username').value = '';
            toggleNewUserTextarea();
          }
          else {

            //checking username is correct or not.
            handleUserDataResponse(userData);

          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }

      }
    }
  });

  if (newUserButtonClicked === false) {
    NoerrorCall();
    async function NoerrorCall() {
      if (username === '') {
        document.getElementById('no-username-warning').style.display = 'block';
        toggleNewUserTextarea();
      }
      else {
        sendUsername(username);

        try {

          const userDataResponse = await fetchUserData();
          document.querySelector('div[aria-busy="true"]').setAttribute('aria-busy', "false");
          

          const userData = await userDataResponse.json();

          if (userData.errors && userData.errors.length > 0) {
            document.getElementById('invalid-username-warning').style.display = 'block';
            document.getElementById('new-username').value = '';
            toggleNewUserTextarea();
          }
          else {
            handleUserDataResponse(userData);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
  }



  // Function to fetch user data
  async function fetchUserData() {
    return await fetch('https://requestserver.onrender.com/getusername');
  }

  // Function to handle user data response
  function handleUserDataResponse(userData) {

    document.getElementById('invalid-username-warning').style.display = 'none';
    document.getElementById('new-username').value = '';

    localStorage.setItem('username', username);
    storedUsername = username;
    const displayUser = document.getElementById('usernamedisplay')
    displayUser.style.color = "#83C0C1";
    displayUser.textContent = `Username: ${storedUsername}`;
    newUserButtonClicked = false;
    // sendUsername(storedUsername);
    fetchDataForEndpoints();
    // addStreakElement();
    // }
  }

  // Function to send the username to the server
  async function sendUsername(username) {
    try {
      const response = await fetch('https://requestserver.onrender.com/setusername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username }),
      });
      const data = await response.json();
      
    } catch (error) {
      console.error('Error sending username:', error);
    }
  }

  // Function to fetch data for endpoints
  async function fetchDataForEndpoints() {
    try {
      const response = await fetch('https://requestserver.onrender.com/username/calendar');
      const submissionCalendar = await response.json();
      const currentStreak = getStreak(submissionCalendar);
      displayStreak(currentStreak);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Function to display the streak count
  function displayStreak(streak) {
    const existingStreak = document.getElementById('streak-element');
    if (existingStreak) {
      existingStreak.remove();
    }
    if (streak === 0) {
      // Display the '0streak' div for 3 seconds and then hide it
      document.getElementById('0streak').style.display = 'block';
      setTimeout(() => {
        document.getElementById('0streak').style.display = 'none';
      }, 20000);

    }
    const newH3 = document.createElement('h3');
    newH3.id = 'streak-element';
    newH3.innerText = 'CurrentStreak: ' + streak;
    const newUserButton = document.getElementById('new-user-button');
    newUserButton.parentNode.insertBefore(newH3, newUserButton);


  }

  // Function to open a new tab with the given URL
  function openNewTab(url) {
    chrome.tabs.create({ url: url });
  }

});
