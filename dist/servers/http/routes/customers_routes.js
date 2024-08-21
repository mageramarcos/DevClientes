import { applyUseCase } from '../../http/middlewares/apply_use_case.js';
import { createCustomer, listCustomers, deleteCustomers } from '../../../application/use-case/customers/index.js';
export const customersRoutes = async (fastify) => {
    fastify.post('/customers', applyUseCase(createCustomer));
    fastify.get('/customers', applyUseCase(listCustomers));
    fastify.delete('/customers/:id', applyUseCase(deleteCustomers, {
        param_key: 'id'
    }));
};
//# sourceMappingURL=customers_routes.js.map