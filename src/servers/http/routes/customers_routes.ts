import { applyUseCase } from '../../http/middlewares/apply_use_case'
import { createCustomer, listCustomers,deleteCustomers } from '../../../application/use-case/customers/index'
import { FastifyInstance } from 'fastify'

export const customersRoutes = async(
	fastify: FastifyInstance
) => {
	fastify.post('/customers', applyUseCase(createCustomer))

	fastify.get('/customers', applyUseCase(listCustomers))

	fastify.delete('/customers/:id',
		applyUseCase(deleteCustomers, {
			param_key: 'id'
		}))
}