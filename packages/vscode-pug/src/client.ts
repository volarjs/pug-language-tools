import { InitializationOptions, DiagnosticModel } from '@volar/language-server';
import * as protocol from '@volar/language-server/protocol';
import type { ExportsInfoForLabs } from '@volar/vscode';
import * as vscode from 'vscode';
import * as lsp from 'vscode-languageclient/node';

let client: lsp.BaseLanguageClient;

export async function activate(context: vscode.ExtensionContext) {

	const initializationOptions: InitializationOptions = {
		diagnosticModel: DiagnosticModel.Pull, // not matter because pug diagnostic is very fast
	};
	const serverModule = vscode.Uri.joinPath(context.extensionUri, 'server.js');
	const runOptions = { execArgv: <string[]>[] };
	const debugOptions = { execArgv: ['--nolazy', '--inspect=' + 6009] };
	const serverOptions: lsp.ServerOptions = {
		run: {
			module: serverModule.fsPath,
			transport: lsp.TransportKind.ipc,
			options: runOptions
		},
		debug: {
			module: serverModule.fsPath,
			transport: lsp.TransportKind.ipc,
			options: debugOptions
		},
	};
	const clientOptions: lsp.LanguageClientOptions = {
		documentSelector: [{ language: 'jade' }],
		initializationOptions,
	};
	client = new lsp.LanguageClient(
		'pug-language-server',
		'Pug Language Server',
		serverOptions,
		clientOptions,
	);
	client.start();

	return {
		volarLabs: {
			version: '1.6.2',
			languageClients: [client],
			languageServerProtocol: protocol,
		},
	} satisfies ExportsInfoForLabs;
}

export function deactivate(): Thenable<any> | undefined {
	return client?.stop();
}
