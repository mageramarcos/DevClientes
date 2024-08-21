var ProcessOptions;
(function (ProcessOptions) {
    ProcessOptions["SUCCESS"] = "success";
    ProcessOptions["FAILED"] = "failed";
})(ProcessOptions || (ProcessOptions = {}));
const normalizationResponse = {
    ok: (result) => {
        return {
            process: ProcessOptions.SUCCESS,
            status_code: 200,
            body: result
        };
    },
    created: (result) => {
        return {
            process: ProcessOptions.SUCCESS,
            status_code: 201,
            body: result
        };
    },
    badRequest: (msg) => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 400,
            body: msg
        };
    },
    unauthorized: () => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 401,
            body: 'Invalid credentials'
        };
    },
    forbidden: () => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 403,
            body: 'Access to this resource is blocked'
        };
    },
    notFound: (msg) => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 404,
            body: msg
        };
    },
    conflict: (msg) => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 409,
            body: msg
        };
    },
    serverError: (msg) => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 500,
            body: msg
        };
    }
};
export { normalizationResponse, ProcessOptions };
//# sourceMappingURL=response.js.map