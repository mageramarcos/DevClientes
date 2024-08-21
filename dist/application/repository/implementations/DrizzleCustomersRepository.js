import { eq } from 'drizzle-orm';
import { drizzleClient } from '../../../core/clients/drizzle.js';
import { Customers } from '../../../db/schema/index.js';
class DrizzleCustomersRepository {
    async findById(id) {
        return await drizzleClient.query.Customers.findFirst({
            where: eq(Customers.id, id)
        }) || null;
    }
    async findMany({}) {
        return await drizzleClient
            .select()
            .from(Customers)
            .$dynamic()
            .then((data) => data);
    }
    async create(data) {
        return await drizzleClient
            .insert(Customers)
            .values({ ...data,
            status: true
        })
            .returning()
            .then(([Customers]) => Customers);
    }
    async delete(id) {
        return await drizzleClient.delete(Customers)
            .where(eq(Customers.id, id))
            .returning()
            .then(([Customers]) => Customers);
    }
}
export { DrizzleCustomersRepository };
//# sourceMappingURL=DrizzleCustomersRepository.js.map