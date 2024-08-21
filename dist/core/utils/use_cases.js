import { normalizationResponse } from './response.js';
class UseCaseHandler {
    constructor(useCase) {
        this.useCase = useCase;
    }
    async handle(data) {
        const validated = this.useCase.validate !== undefined
            ? await this.useCase.validate(data)
            : normalizationResponse.ok(data);
        if (validated.process !== 'success')
            return validated;
        return this.useCase.execute(validated.body);
    }
}
export { UseCaseHandler };
//# sourceMappingURL=use_cases.js.map