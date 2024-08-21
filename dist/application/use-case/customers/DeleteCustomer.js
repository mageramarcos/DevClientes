import joi from 'joi';
import { normalizationResponse } from '../../../core/utils/response.js';
import validator from '../../../core/utils/validator.js';
class DeleteCustomer {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute({ id }) {
        try {
            const findByCustomerId = await this.customerRepository.findById(id);
            if (!findByCustomerId) {
                return normalizationResponse.notFound('Customer not exist');
            }
            const deleteCustomer = await this.customerRepository.delete(id);
            if (!deleteCustomer) {
                return normalizationResponse.notFound('Customer');
            }
            return normalizationResponse.ok({ message: "Successfully Deleted" });
        }
        catch (error) {
            return normalizationResponse.serverError(error.message);
        }
    }
    async validate(data) {
        const schema = joi.object({
            id: joi.string().required()
        });
        const validated = await validator(schema, data);
        if (!validated.isValid) {
            return normalizationResponse.badRequest(validated.error);
        }
        return normalizationResponse.ok(validated.data);
    }
}
export { DeleteCustomer };
//# sourceMappingURL=DeleteCustomer.js.map