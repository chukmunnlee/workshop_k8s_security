const FORTUNE_COOKIES = require('fortune-cookie')
const morgan = require('morgan')
const fetch = require('node-fetch')
const withQuery = require('with-query').default
const express = require('express')
const hbs = require('express-handlebars')

const NOT_SET = 'not-set'
const PORT = parseInt(process.env.PORT) || 3000
const COUNTRY = process.env.COUNTRY || 'singapore'
const OPEN_WEATHER_MAP = process.env.OPEN_WEATHER_MAP || NOT_SET

const app = express()

const since = Math.floor((new Date()).getTime() / 1000)

app.engine('hbs', hbs({ defaultLayout: 'default.hbs' }))
app.set('view engine', 'hbs')

app.use(morgan('combined'))

app.use(express.static(__dirname + '/public'))

app.get('/healthz', (req,resp) => {
	const now = new Date()
	resp.status(200).type('application/json')
		.json({
			status: 'OK',
			duration: Math.floor(now.getTime() / 1000) - since,
			currentTime: now.toLocaleString(),
			since,
		})
})

app.use((req, resp) => {
	const text = rndCookie(FORTUNE_COOKIES)

	if (OPEN_WEATHER_MAP == NOT_SET)
		return resp.status(200).type('text/html')
			.render('index', { text, showWeather: false })

	fetch(
		withQuery('http://api.openweathermap.org/data/2.5/weather', {
			q: COUNTRY,
			appid: OPEN_WEATHER_MAP
		})
	)
	.then(result => result.json())
	.then(result => {
		// take the first result only
		const w = result.weather[0]
		return resp.status(200).type('text/html')
			.render('index', { 
				text, 
				showWeather: true,
				description: `${w.main} - ${w.description}`,
				icon: w.icon,
				country: COUNTRY.toUpperCase()
			})
	})
})

app.listen(PORT, () => {
	console.info(`Application started on port ${PORT} at ${new Date()}`)
})

// random cookie
const rndCookie = (cookies) => {
	const idx = Math.floor(Math.random() * cookies.length)
	return cookies[idx]
}
