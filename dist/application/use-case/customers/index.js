import { DrizzleCustomersRepository } from "../../../application/repository/implementations/DrizzleCustomersRepository.js";
import { CreateCustomer } from "./CreateCustomer.js";
import { UseCaseHandler } from "../../../core/utils/use_cases.js";
import { ListCustomers } from "./ListCustomers.js";
import { DeleteCustomer } from "./DeleteCustomer.js";
export const createCustomer = () => {
    const customerRepository = new DrizzleCustomersRepository();
    return new UseCaseHandler(new CreateCustomer(customerRepository));
};
export const listCustomers = () => {
    const customerRepository = new DrizzleCustomersRepository();
    return new UseCaseHandler(new ListCustomers(customerRepository));
};
export const deleteCustomers = () => {
    const customerRepository = new DrizzleCustomersRepository();
    return new UseCaseHandler(new DeleteCustomer(customerRepository));
};
//# sourceMappingURL=index.js.map