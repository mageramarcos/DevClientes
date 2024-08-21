const validator = async (schema, data) => {
    try {
        const value = await schema.validateAsync(data, { stripUnknown: true });
        return {
            isValid: true,
            data: value
        };
    }
    catch (error) {
        return {
            isValid: false,
            error: error.message
        };
    }
};
export default validator;
//# sourceMappingURL=validator.js.map