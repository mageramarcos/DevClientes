import joi from 'joi';
import { normalizationResponse } from '../../../core/utils/response.js';
import validator from '../../../core/utils/validator.js';
class CreateCustomer {
    constructor(CustomersRepository) {
        this.CustomersRepository = CustomersRepository;
    }
    async execute(data) {
        try {
            const customers = await this.CustomersRepository.create(data);
            return normalizationResponse.ok({ customers });
        }
        catch (error) {
            return normalizationResponse.serverError(error.message);
        }
    }
    async validate(data) {
        const schema = joi.object({
            name: joi.string().required(),
            email: joi.string().required()
        });
        const validated = await validator(schema, data);
        if (!validated.isValid) {
            return normalizationResponse.badRequest(validated.error);
        }
        return normalizationResponse.ok(validated.data);
    }
}
export { CreateCustomer };
//# sourceMappingURL=CreateCustomer.js.map