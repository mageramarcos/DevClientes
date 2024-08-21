import { ICustomers } from '../entities/ICustomers'
import {  CustomOmit } from '../../core/utils/types'

type ICreateCustomerParams = CustomOmit<
ICustomers,
    | 'createdAt'
    | 'id'
    | 'updatedAt'
>

type IFindManyCustomerParams = {
	page?: number
}

interface ICustomerRepository {
	create(params: ICreateCustomerParams): Promise<ICustomers>
	findMany(params: IFindManyCustomerParams): Promise<ICustomers[]>
	findById(id: string): Promise<ICustomers | null>
	delete(id: string): Promise<ICustomers>
}

export {
	ICreateCustomerParams,
	ICustomerRepository,
	IFindManyCustomerParams
}