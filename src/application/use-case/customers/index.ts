import { DrizzleCustomersRepository } from "../../../application/repository/implementations/DrizzleCustomersRepository"
import { CreateCustomer } from "./CreateCustomer"
import { UseCaseHandler } from "../../../core/utils/use_cases"
import { ListCustomers } from "./ListCustomers"
import { DeleteCustomer } from "./DeleteCustomer"

export const createCustomer = () => {
	const customerRepository = new DrizzleCustomersRepository()
    return new UseCaseHandler(new CreateCustomer(customerRepository))
}

export const listCustomers = () =>{
    const customerRepository = new DrizzleCustomersRepository()
    return new UseCaseHandler(new ListCustomers(customerRepository))

}

export const deleteCustomers = () =>{
 const customerRepository = new DrizzleCustomersRepository()
 return new UseCaseHandler(new DeleteCustomer(customerRepository))
}