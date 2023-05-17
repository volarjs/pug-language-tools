import createPugService from 'volar-service-pug';
import createPugBeautifyService from 'volar-service-pug-beautify';
import { createConnection, startLanguageServer, LanguageServerPlugin } from '@volar/language-server/node';

const plugin: LanguageServerPlugin = (): ReturnType<LanguageServerPlugin> => ({
	extraFileExtensions: [],
	watchFileExtensions: [],
	resolveConfig(config) {
		config.services ??= {};
		config.services.pug ??= createPugService();
		config.services['pug-beautify'] ??= createPugBeautifyService();
		return config;
	},
});

startLanguageServer(createConnection(), plugin);
