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

displayCountryDetails("Switzerland");