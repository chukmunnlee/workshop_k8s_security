const FORTUNE_COOKIES = require('fortune-cookie')
const morgan = require('morgan')
const express = require('express')
const hbs = require('express-handlebars')

const PORT = parseInt(process.env.PORT) || 3000

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
	resp.status(200).type('text/html')
		.render('index', { text })
})

app.listen(PORT, () => {
	console.info(`Application started on port ${PORT} at ${new Date()}`)
})

// random cookie
const rndCookie = (cookies) => {
	const idx = Math.floor(Math.random() * cookies.length)
	return cookies[idx]
}
