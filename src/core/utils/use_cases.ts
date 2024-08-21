import { Response, normalizationResponse } from './response'

/**
 * Represents a generic use case interface.
 * @template T - The input data type.
 * @template K - The output data type.
 */
interface IUseCase<T, K> {
	/**
     * Validates the input data for the use case and returns a corresponding T.
     * @param data - The input data.
     * @returns A promise that resolves to a response of type K.
     */
	validate?(data: T): Promise<Response<T>>

	/**
     * Executes the use case by processing the input data and returning a response.
     * @param data - The input data.
     * @returns A promise that resolves to a response of type K.
     */
	execute(data: T): Promise<Response<K>>
}

/**
 * Represents a wrapped use case that
 *
 * @template T - The type of data that the use case handles.
 * @template K - The type of response that the use case returns.
 */
interface IWrappedUseCase<T, K> {
	handle(data: T): Promise<Response<K>>
}

/**
 * Represents a handler for executing use cases.
 * @template T The input data type for the use case.
 * @template K The output data type for the use case.
 */
class UseCaseHandler<T, K> implements IWrappedUseCase<T, K> {
	constructor(private useCase: IUseCase<T, K>) {}

	/**
     * Handles the internal calls of the use case.
     * @param data The input data for the use case.
     * @returns A promise that resolves to the response from the use case execution.
     */
	async handle(data: T): Promise<Response<K>> {
		const validated = this.useCase.validate !== undefined
			? await this.useCase.validate(data)
			: normalizationResponse.ok(data)
		if (validated.process !== 'success') return validated
		return this.useCase.execute(validated.body)
	}
}

export { IUseCase, IWrappedUseCase, UseCaseHandler }