import { normalizationResponse } from '../../../core/utils/response.js';
class ListCustomers {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute() {
        try {
            const customers = await this.customerRepository.findMany({});
            return normalizationResponse.ok({ customer: customers });
        }
        catch (error) {
            return normalizationResponse.serverError(error.message);
        }
    }
}
export { ListCustomers };
//# sourceMappingURL=ListCustomers.js.map