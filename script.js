const inputIHave = document.querySelector('.input-i-have')
const inputWontBye = document.querySelector('.input-wont-bye')
const currencyIHave = document.querySelector('.currency-i-have')
const currencyWontBye = document.querySelector('.currency-wont-bye')

async function getExchangeRates() {
	try {
		const response = await fetch(
			'https://v6.exchangerate-api.com/v6/e8ada5306e32a42ba2e3a91e/latest/USD'
		)
		const data = await response.json()
		return data.conversion_rates
	} catch (error) {
		console.error(error)
		return null
	}
}

async function convertCurrency() {
	const rates = await getExchangeRates()
	const amount = parseFloat(inputIHave.value)
	const fromCurrency = currencyIHave.value
	const toCurrency = currencyWontBye.value

	if (!isNaN(amount) && rates) {
		const convertedAmount = (amount * rates[toCurrency]) / rates[fromCurrency]
		inputWontBye.value = convertedAmount.toFixed(2)
	} else {
		inputWontBye.value = ''
	}
}

inputIHave.oninput = convertCurrency
currencyIHave.onchange = convertCurrency
currencyWontBye.onchange = convertCurrency
