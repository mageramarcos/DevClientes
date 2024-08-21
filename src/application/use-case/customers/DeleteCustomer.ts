import joi from 'joi'

import { ICustomerRepository } from '../../repository/ICustomersRepository'
import { Response, normalizationResponse } from '../../../core/utils/response'
import { IUseCase } from '../../../core/utils/use_cases'
import validator from '../../../core/utils/validator'


type DeleteCustomerRequest = {
    id : string
}
type DeleteCustomerResponse = {
    message: string
}

type T = DeleteCustomerRequest
type K = DeleteCustomerResponse

class DeleteCustomer implements IUseCase<T, K> {
    constructor(
        private readonly customerRepository: ICustomerRepository
    ) {}

    async execute({ id }: T): Promise<Response<K>> {
        try {
    
            const findByCustomerId = await this.customerRepository.findById(id)

            if(!findByCustomerId){
                return normalizationResponse.notFound('Customer not exist')
            }

            const deleteCustomer = await this.customerRepository.delete(id)


if(!deleteCustomer){
    return normalizationResponse.notFound('Customer')
}

            return normalizationResponse.ok({ message: "Successfully Deleted" })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }

    async validate(data: T): Promise<Response<T>> {
        const schema = joi.object({
            id: joi.string().required()
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

export { DeleteCustomer }