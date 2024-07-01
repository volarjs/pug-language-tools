import { createConnection, createServer, createSimpleProject } from '@volar/language-server/node';
import { create as createPugPlugin } from 'volar-service-pug';
import { create as createPugBeautifyPlugin } from 'volar-service-pug-beautify';

const connection = createConnection();
const server = createServer(connection);

connection.onInitialize(params => {
	return server.initialize(
		params,
		createSimpleProject([]),
		[
			createPugPlugin(),
			createPugBeautifyPlugin(),
		],
		{ pullModelDiagnostics: true }
	);
});

connection.onInitialized(server.initialized);

connection.onShutdown(server.shutdown);

connection.listen();
