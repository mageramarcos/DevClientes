import http from './http/app'
import { env } from '../core/utils/env'
import cluster from 'node:cluster'
import { cpus } from 'node:os'
import process from 'node:process'

if (cluster.isPrimary && env.NODE_ENV === 'production') {
	console.log(
		`[customer] Primary cluster with pid ${process.pid} is running`
	)

	// Fork workers.
	for (let i = 0; i < cpus().length; i++) {
		cluster.fork()
	}

	cluster.on('exit', (worker) => {
		console.log(`[customer] Worker with pid ${worker.process.pid} died`)
	})
} else {
	// Workers can share any TCP connection
	// In this case it is an fastify server
	console.log(`[customer] Worker with pid ${process.pid} started`)
	http
		.listen({ port: env.PORT })
		.then(() => console.log(`[customer] Server running on port ${env.PORT}`))
}