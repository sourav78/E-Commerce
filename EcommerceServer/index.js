import dotenv from 'dotenv'
dotenv.config()

import app from './config/app.js'


app.listen(process.env.PORT, () => {
    console.log(`Server started : http://localhost:${process.env.PORT}`)
})