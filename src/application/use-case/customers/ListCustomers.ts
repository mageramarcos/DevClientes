import { ICustomerRepository } from '../../repository/ICustomersRepository'
import { Response, normalizationResponse } from '../../../core/utils/response'
import { IUseCase } from '../../../core/utils/use_cases'
import { ICustomers } from '../../entities/ICustomers'

type ListCustomersRequest = {}
type ListCustomersResponse = {
    customer : ICustomers[]
}

type T = ListCustomersRequest
type K = ListCustomersResponse

class ListCustomers implements IUseCase<T, K> {
    constructor(
        private readonly customerRepository: ICustomerRepository
    ) {}

    async execute(): Promise<Response<K>> {
        try {

            const customers = await this.customerRepository.findMany({})

            return normalizationResponse.ok({customer: customers })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }

}

export { ListCustomers }