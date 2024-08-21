import joi from 'joi'

import { ICustomerRepository } from '../../repository/ICustomersRepository'
import { Response, normalizationResponse } from '../../../core/utils/response'
import { IUseCase } from '../../../core/utils/use_cases'
import validator from '../../../core/utils/validator'
import { ICustomers } from '../../entities/ICustomers'
import { CustomOmit } from '../../../core/utils/types'

type CreateCustomerRequest = CustomOmit<
ICustomers,
| 'id'
| 'createdAt'
| 'updatedAt'

>
type CreateCustomerResponse = {
    customers: ICustomers
}

type T = CreateCustomerRequest
type K = CreateCustomerResponse


class CreateCustomer implements IUseCase<T, K> {
    constructor(
        private readonly CustomersRepository: ICustomerRepository
    ) {}

    async execute(data: T): Promise<Response<K>> {
        try {
			const customers = await this.CustomersRepository.create(data)

			return normalizationResponse.ok({ customers })
		} catch (error) {
			return normalizationResponse.serverError(error.message)
		}
    }

    async validate(data: T): Promise<Response<T>> {
        const schema = joi.object({
            name: joi.string().required(),
            email: joi.string().required()
        })
        const validated = await validator<T>(
            schema,
            data
        )
        if (!validated.isValid) {
            return normalizationResponse.badRequest(validated.error)
        }
        return normalizationResponse.ok(validated.data)
    }
}

export { CreateCustomer }