const errorContainer = document.createElement('div');
errorContainer.id = 'error-container';
document.body.appendChild(errorContainer);

const fetchCountryData = async (countryName) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessage = (`ERROR ${error.message}: "${countryName}" is not a country.`);

        const errorElement = document.createElement('p');
        errorElement.textContent = errorMessage;
        errorContainer.appendChild(errorElement);
    }
};

const createCountryDetailsElement = (countryDetails) => {
    const countryContainer = document.querySelector('#country-stats');

    Object.entries(countryDetails).forEach((entry) => {
        const [detailName, detailValue] = entry;

        const detailElement = document.createElement('p');
        detailElement.textContent = `${detailName}: ${detailValue}`;

        countryContainer.appendChild(detailElement);
    });
};

const getCountryByName = async (countryName) => {
    const countryData = await fetchCountryData(countryName);
    return countryData;
};

const displayCountryDetails = async (countryName) => {

    try {
        const countryData = await getCountryByName(countryName);
        const countryDetails = {
            name: countryData[0].name.common,
            languages: Object.values(countryData[0].languages).join(`, `),
            capital: countryData[0].capital,
            population: countryData[0].population,
        };

        createCountryDetailsElement(countryDetails);
    } catch (error) {
        const errorMessage = (`ERROR: Cannot display details of "${countryName}".`);
        const errorElement = document.createElement('p');
        errorElement.textContent = errorMessage;
        errorContainer.appendChild(errorElement);
    }
};

const getAllCountries = async () => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const countriesData = await response.json();
        return countriesData;
    } catch (error) {
        const errorMessage = (`ERROR ${error.message}: Cannot fetch all countries.`);
        const errorElement = document.createElement('p');
        errorElement.textContent = errorMessage;
        errorContainer.appendChild(errorElement);
    }
};

const displayAllCountries = async () => {
    try {
        const countriesData = await getAllCountries();

        const countriesContainer = document.querySelector('#all-countries');

        countriesData.forEach((country) => {
            const countryElement = document.createElement('div');
            countryElement.textContent = country.name.common;

            const countryDetailsButton = document.createElement('button');
            countryDetailsButton.textContent = 'Show Details';
            countryDetailsButton.addEventListener('click', async () => {
                await displayCountryDetails(country.name.common);
            });

            countryElement.appendChild(countryDetailsButton);
            countriesContainer.appendChild(countryElement);
        });
    } catch (error) {
        const errorMessage = (`Cannot display all countries.`);
        const errorElement = document.createElement('p');
        errorElement.textContent = errorMessage;
        errorContainer.appendChild(errorElement);
    }
};

displayAllCountries();
// displayCountryDetails("Switzerlnd");