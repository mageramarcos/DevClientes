import { eq } from 'drizzle-orm'
import { drizzleClient } from '../../../core/clients/drizzle'
import { Customers } from '../../../db/schema'
import { ICustomers } from '../../entities/ICustomers'
import { ICreateCustomerParams,ICustomerRepository,IFindManyCustomerParams } from '../../repository/ICustomersRepository'


class DrizzleCustomersRepository implements ICustomerRepository {
	
	async findById(id: string): Promise<ICustomers | null> {
		return await drizzleClient.query.Customers.findFirst({
			where: eq(Customers.id, id)
		}) || null
	}

	async findMany({}: IFindManyCustomerParams): Promise<ICustomers[]> {
		return await drizzleClient
			.select()
			.from(Customers)
			.$dynamic()
			.then((data) => data)
	}

	async create(data: ICreateCustomerParams): Promise<ICustomers> {
		return await drizzleClient
			.insert(Customers)
			.values({...data,
				status : true
			})
			.returning()
			.then(([Customers]) => Customers)
	}

	async delete(id: string): Promise<ICustomers> {
		return await drizzleClient.delete(Customers)
			.where(eq(Customers.id, id))
			.returning()
			.then(([Customers]) => Customers)
	}
}

export { DrizzleCustomersRepository }