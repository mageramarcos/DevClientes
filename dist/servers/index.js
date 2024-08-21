import http from './http/app.js';
import { env } from '../core/utils/env.js';
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';
if (cluster.isPrimary && env.NODE_ENV === 'production') {
    console.log(`[customer] Primary cluster with pid ${process.pid} is running`);
    for (let i = 0; i < cpus().length; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`[customer] Worker with pid ${worker.process.pid} died`);
    });
}
else {
    console.log(`[customer] Worker with pid ${process.pid} started`);
    http
        .listen({ port: env.PORT })
        .then(() => console.log(`[customer] Server running on port ${env.PORT}`));
}
//# sourceMappingURL=index.js.map