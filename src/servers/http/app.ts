import 'dotenv/config'
import cors from '@fastify/cors'
import fastify from 'fastify'
import { customersRoutes } from './routes/customers_routes'

const app = fastify()

app.register(cors, { origin: '*' })

app.register(customersRoutes)

export default app