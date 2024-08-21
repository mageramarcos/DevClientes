import { ProcessOptions } from './response.js';
const entryLogger = (message) => {
    const { service, topic, route } = message;
    let logMessage = `[${service}] New message on`;
    if (topic !== undefined) {
        logMessage += ` topic: ${topic}.`;
    }
    else if (route !== undefined) {
        logMessage += ` route: ${route}.`;
    }
    const timestamp = new Date().toISOString();
    logMessage += ` At ${timestamp}`;
    console.log(logMessage);
};
const responseLogger = (message) => {
    const { service, topic, route, process, status_code, body } = message;
    let logMessage = `[${service}]`;
    if (topic !== undefined) {
        logMessage += ` Topic: ${topic}`;
    }
    else if (route !== undefined) {
        logMessage += ` Route: ${route}`;
    }
    logMessage += ` result was "${process}" with status code ${status_code}.`;
    if (process === 'failed') {
        logMessage += ` The failed reason was "${body?.toString()}".`;
    }
    logMessage += ` At ${new Date().toISOString()}`;
    console.log(logMessage);
};
const functionLogger = (message) => {
    const { service, class_name, function_name, process, data } = message;
    let logMessage = `[${service}] Call on `;
    if (class_name !== undefined) {
        logMessage += `${class_name}@`;
    }
    logMessage += `${function_name} result was "${process}".`;
    if (process === ProcessOptions.FAILED) {
        const dataMessage = data.map(_data => JSON.stringify(_data));
        logMessage += ` The failed reason was ${JSON.stringify(dataMessage.join(', '))}.`;
    }
    const timestamp = new Date().toISOString();
    logMessage += ` At ${timestamp}`;
    console.log(logMessage);
};
export { entryLogger, functionLogger, responseLogger };
//# sourceMappingURL=logger.js.map