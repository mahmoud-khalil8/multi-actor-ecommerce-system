 async function fetchCountries() {

    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const countrySelect = document.getElementById('country');
        countries
        .sort((a, b) => a.name.common.localeCompare(b.name.common)) // Sort alphabetically
          .forEach(country => {
            const option = document.createElement('option');
            option.value = country.cca2; // Country code
            option.textContent = country.name.common; // Country name
            countrySelect.appendChild(option);
          });
        } catch (error) {
          console.error('Error fetching countries:', error);
        }
      }

    // Fetch and populate cities based on the selected country
    async function fetchCities(countryCode) {
      try {
        const response = await fetch(`https://countriesnow.space/api/v0.1/countries/cities`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ country: countryCode }),
        });
        const data = await response.json();
        const citySelect = document.getElementById('city');
        citySelect.innerHTML = '<option value="">Select a city</option>'; // Reset cities
        if (data.data) {
          data.data.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
          });
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }

    // Event listeners
    document.addEventListener('DOMContentLoaded', fetchCountries);
    document.getElementById('country').addEventListener('change', function () {
      const countryName = this.options[this.selectedIndex].text;
      if (countryName) fetchCities(countryName);
    });