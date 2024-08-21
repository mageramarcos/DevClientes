enum ProcessOptions {
	SUCCESS = 'success',
	FAILED = 'failed'
}

interface SuccessResponse<T> {
	process: ProcessOptions.SUCCESS
	body: T
}

interface FailedResponse {
	process: ProcessOptions.FAILED
	body: string
}

type Response<T> = {
	status_code: number
} & (FailedResponse | SuccessResponse<T>)
const normalizationResponse = {
	ok: <T>(result: T):Response<T> => {
		return {
			process: ProcessOptions.SUCCESS,
			status_code: 200,
			body: result
		}
	},
	created: <T>(result: T):Response<T> => {
		return {
			process: ProcessOptions.SUCCESS,
			status_code: 201,
			body: result
		}
	},
	badRequest: <T>(msg: string):Response<T> => {
		return {
			process: ProcessOptions.FAILED,
			status_code: 400,
			body: msg
		}
	},
	unauthorized: <T>():Response<T> => {
		return {
			process: ProcessOptions.FAILED,
			status_code: 401,
			body: 'Invalid credentials'
		}
	},
	forbidden: <T>():Response<T> => {
		return {
			process: ProcessOptions.FAILED,
			status_code: 403,
			body: 'Access to this resource is blocked'
		}
	},
	notFound: <T>(msg: string):Response<T> => {
		return {
			process: ProcessOptions.FAILED,
			status_code: 404,
			body: msg
		}
	},
	conflict: <T>(msg: string):Response<T> => {
		return {
			process: ProcessOptions.FAILED,
			status_code: 409,
			body: msg
		}
	},
	serverError: <T>(msg: string):Response<T> => {
		return {
			process: ProcessOptions.FAILED,
			status_code: 500,
			body: msg
		}
	}
}

export {
	normalizationResponse, ProcessOptions, Response
}