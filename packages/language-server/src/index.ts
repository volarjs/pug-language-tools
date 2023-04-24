import createPugPlugin from '@volar-plugins/pug';
import createPugBeautifyPlugin from '@volar-plugins/pug-beautify';
import { createConnection, startLanguageServer, LanguageServerPlugin } from '@volar/language-server/node';

const plugin: LanguageServerPlugin = (): ReturnType<LanguageServerPlugin> => ({
	extraFileExtensions: [],
	watchFileExtensions: [],
	resolveConfig(config) {
		config.plugins ??= {};
		config.plugins.pug ??= createPugPlugin();
		config.plugins['pug-beautify'] ??= createPugBeautifyPlugin();
		return config;
	},
});

startLanguageServer(createConnection(), plugin);
