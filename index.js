const getCountryByName = async (countryName) => {
    response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    data = await response.json();
    console.log(data)
}

getCountryByName("Nigeria");