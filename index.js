const getCountryByName = async (countryName) => {
    response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    data = await response.json();
    return data;
}

const switzerland = getCountryByName("Switzerland");

const displayCountryDetails = async () => {

    const countryData = await switzerland;

    const countryDetails = {
        name: countryData[0].name.common,
        languages: Object.values(countryData[0].languages).join(`, `),
        capital: countryData[0].capital,
        population: countryData[0].population,
    };

    const countryContainer = document.querySelector('#country-stats');

    Object.entries(countryDetails).forEach((entry) => {
        const [detailName, detailValue] = entry;

        const detailElement = document.createElement('p');
        detailElement.textContent = `${detailName}: ${detailValue}`;

        countryContainer.appendChild(detailElement);
    });
};

displayCountryDetails();