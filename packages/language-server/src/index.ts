import * as createPugPlugin from '@volar-plugins/pug';
import * as createPugBeautifyPlugin from '@volar-plugins/pug-beautify';
import { createConnection, startLanguageServer, LanguageServerPlugin } from '@volar/language-server/node';

const plugin: LanguageServerPlugin = () => ({
	tsconfigExtraFileExtensions: [],
	diagnosticDocumentSelector: [{ language: 'jade' }],
	extensions: {
		fileRenameOperationFilter: [],
		fileWatcher: [],
	},
	resolveConfig(config) {
		config.plugins ??= {};
		config.plugins.pug ??= createPugPlugin();
		config.plugins['pug-beautify'] ??= createPugBeautifyPlugin();
	},
});

startLanguageServer(createConnection(), plugin);
