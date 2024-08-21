import joi from 'joi';
const envSchema = joi.object({
    NODE_ENV: joi.string().valid('production', 'local').default('local'),
    PORT: joi.number().default(3003),
    DATABASE_URL: joi.string().uri().required()
});
const validatedEnv = envSchema.validate(process.env, {
    stripUnknown: true
});
if (validatedEnv.error) {
    throw new Error(`Invalid environment variables: ${validatedEnv.error.message}`);
}
export const env = validatedEnv.value;
//# sourceMappingURL=env.js.map