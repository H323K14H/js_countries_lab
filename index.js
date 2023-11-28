const fetchCountryData = async (countryName) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await response.json();
    return data;
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
}

const displayCountryDetails = async (countryName) => {

    const countryData = await getCountryByName(countryName);
    const countryDetails = {
        name: countryData[0].name.common,
        languages: Object.values(countryData[0].languages).join(`, `),
        capital: countryData[0].capital,
        population: countryData[0].population,
    };

    createCountryDetailsElement(countryDetails);
};

const getAllCountries = async () => {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const countriesData = await response.json();
    return countriesData;
}

const displayAllCountries = async () => {
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
}
displayAllCountries();

// displayCountryDetails("Switzerland");