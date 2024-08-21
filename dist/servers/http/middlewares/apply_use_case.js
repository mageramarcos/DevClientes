import { responseLogger } from '../../../core/utils/logger.js';
const applyUseCase = (useCase, options) => {
    return async (req, res) => {
        let data = { ...req.params, ...req.query, ...req.body };
        if (options !== undefined) {
            const { separate_body, get_meta_data, param_key } = options;
            if (separate_body) {
                const { active_user_id, active_organization_id, ...body } = data;
                data = {
                    active_user_id,
                    active_organization_id,
                    data: body
                };
            }
            if (get_meta_data) {
                data.meta_data = {
                    ip: req.ip,
                    user_agent: req.headers['user-agent']
                };
            }
            if (param_key !== undefined) {
                data[param_key] = req.params.id;
            }
        }
        const { status_code, process, body } = await useCase().handle(data);
        if (options?.log_response !== undefined &&
            (typeof options.log_response === 'boolean' ||
                options.log_response.validator(status_code))) {
            responseLogger({
                service: 'customers',
                process,
                body,
                status_code,
                route: req.originalUrl
            });
        }
        return res.status(status_code).send({ process, body });
    };
};
export { applyUseCase };
//# sourceMappingURL=apply_use_case.js.map