import { ProcessOptions } from './response'

// Logger to register new messages or route calls
interface IBaseEntryLogger {
	service: string
}

interface IMessagingEntryLogger extends IBaseEntryLogger {
	topic: string
	route?: never
}

interface IHttpEntryLogger extends IBaseEntryLogger {
	topic?: never
	route: string
}

type IEntryLogger = IHttpEntryLogger | IMessagingEntryLogger

const entryLogger = (message: IEntryLogger) => {
	// Log result of operations from messaging entry point
	const { service, topic, route } = message

	let logMessage = `[${service}] New message on`
	if (topic !== undefined) {
		logMessage += ` topic: ${topic}.`
	} else if (route !== undefined) {
		logMessage += ` route: ${route}.`
	}

	const timestamp = new Date().toISOString()
	logMessage += ` At ${timestamp}`

	console.log(logMessage)
}

// Logger to register messages or route responses
interface IBaseResponseLogger<T> {
	service: string
	process: ProcessOptions
	status_code: number
	body: string | T | undefined
}

interface IMessagingResponseLogger<T> extends IBaseResponseLogger<T> {
	topic: string
	route?: never
}

interface IHttpResponseLogger<T> extends IBaseResponseLogger<T> {
	topic?: never
	route: string
}

type IResponseLogger<T> = IHttpResponseLogger<T> | IMessagingResponseLogger<T>

const responseLogger = <T>(message: IResponseLogger<T>) => {
	// Log result of operations from messaging entry point
	const { service, topic, route, process, status_code, body } = message

	let logMessage = `[${service}]`
	if (topic !== undefined) {
		logMessage += ` Topic: ${topic}`
	} else if (route !== undefined) {
		logMessage += ` Route: ${route}`
	}

	logMessage += ` result was "${process}" with status code ${status_code}.`
	if (process === 'failed') {
		logMessage += ` The failed reason was "${body?.toString()}".`
	}

	logMessage += ` At ${new Date().toISOString()}`
	console.log(logMessage)
}

// Logger to register functions calls
interface IFunctionLogger {
	service: string
	class_name?: string
	function_name: string
	process: ProcessOptions
	data: unknown[]
}

const functionLogger = (message: IFunctionLogger) => {
	const { service, class_name, function_name, process, data } = message

	// Log the data of the function
	let logMessage = `[${service}] Call on `
	if (class_name !== undefined) {
		logMessage += `${class_name}@`
	}
	logMessage += `${function_name} result was "${process}".`
	if (process === ProcessOptions.FAILED) {
		const dataMessage = data.map(_data => JSON.stringify(_data))
		logMessage += ` The failed reason was ${JSON.stringify(dataMessage.join(', '))}.`
	}

	const timestamp = new Date().toISOString()
	logMessage += ` At ${timestamp}`

	console.log(logMessage)
}

export { entryLogger, functionLogger, responseLogger }