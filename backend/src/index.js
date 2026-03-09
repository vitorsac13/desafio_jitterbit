import express from 'express'
import cors from 'cors'
import passport from 'passport'
import { Mongo } from './database/mongo.js'
import { config } from 'dotenv'
import orderRouter from './routes/order.js'

config()

async function main () {
    const hostname = 'localhost'
    const port = 3000

    const app = express()

    const mongoConnection = await Mongo.connect({ mongoConnectionString: process.env.MONGO_CS, mongoDbName: process.env.MONGO_DB_NAME})
    console.log(mongoConnection)

    app.use(express.json())
    app.use(cors())
    app.use(passport.initialize())

    app.get('/', (req, res) => {
        res.send({
            success: true,
            statuscode: 200,
            body: 'Welcome to API!'
        })
    })

    app.use('/order', orderRouter)

    app.listen(port, () => {
        console.log(`Server running on http://${hostname}:${port}`)
    })
}

main ()