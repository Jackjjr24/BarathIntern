// Function to fetch weather data
async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'dd5a5278b0a86bdac127c890ce62431d'; // Replace with your API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
      displayAddToSavedButton(city);  // Display the dynamic "Add to Saved Locations" button
    } else {
      document.getElementById('weatherInfo').innerHTML = 'Error fetching weather data.';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('weatherInfo').innerHTML = 'Error fetching weather data.';
  }
}

// Function to display weather data with emojis
function displayWeather(data) {
  const weatherDescription = data.weather[0].description.toLowerCase();
  const emoji = getWeatherEmoji(weatherDescription); // Get emoji based on weather description
  
  const weatherInfo = `
    <h2>${data.name}, ${data.sys.country} ${emoji}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Description: ${data.weather[0].description} ${emoji}</p>
  `;
  document.getElementById('weatherInfo').innerHTML = weatherInfo;
}

// Function to get emoji based on weather description
function getWeatherEmoji(description) {
  switch (description) {
    case 'clear sky':
      return '☀️';
    case 'few clouds':
      return '🌤';
    case 'scattered clouds':
      return '⛅';
    case 'broken clouds':
      return '☁️';
    case 'shower rain':
      return '🌦';
    case 'rain':
      return '🌧';
    case 'thunderstorm':
      return '⛈';
    case 'snow':
      return '❄️';
    case 'mist':
      return '🌫';
    default:
      return '🌍'; // Generic globe emoji as a fallback
  }
}

// Function to display "Add to Saved Locations" button for the searched location
function displayAddToSavedButton(location) {
  const addToSavedButton = `
    <button onclick="addToSavedLocations('${location}')">Add ${location} to Saved Locations</button>
  `;
  document.getElementById('weatherInfo').innerHTML += addToSavedButton;
}

// Function to add location to saved locations
async function addToSavedLocations(location) {
  const locationsList = document.getElementById('locationsList');
  const listItem = document.createElement('li');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function() {
    listItem.remove(); // Remove the saved location when the delete button is clicked
  };
  
  // Fetch weather data for the added location
  const apiKey = 'dd5a5278b0a86bdac127c890ce62431d'; // Replace with your API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      listItem.textContent = `${location}: ${data.main.temp}°C `;
      listItem.appendChild(deleteButton); // Append the delete button to the list item
      locationsList.appendChild(listItem);
    } else {
      throw new Error('Error fetching data.');
    }
  } catch (error) {
    console.error('Error fetching weather data for saved location:', error);
    listItem.textContent = `${location}: Error fetching data.`;
    listItem.appendChild(deleteButton); // Append the delete button to the list item even if there's an error
    locationsList.appendChild(listItem);
  }
}

// Display saved locations on page load
// You can fetch saved locations from a database or local storage if needed
// For demonstration purposes, I'm not including the default saved locations here.
