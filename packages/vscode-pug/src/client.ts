import * as serverProtocol from '@volar/language-server/protocol';
import { BaseLanguageClient, createLabsInfo, LanguageClientOptions } from '@volar/vscode';
import { LanguageClient, ServerOptions, TransportKind } from '@volar/vscode/node';
import * as vscode from 'vscode';

let client: BaseLanguageClient;

export async function activate(context: vscode.ExtensionContext) {
	const serverModule = vscode.Uri.joinPath(context.extensionUri, 'server.js');
	const runOptions = { execArgv: <string[]>[] };
	const debugOptions = { execArgv: ['--nolazy', '--inspect=' + 6009] };
	const serverOptions: ServerOptions = {
		run: {
			module: serverModule.fsPath,
			transport: TransportKind.ipc,
			options: runOptions
		},
		debug: {
			module: serverModule.fsPath,
			transport: TransportKind.ipc,
			options: debugOptions
		},
	};
	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ language: 'jade' }],
	};
	client = new LanguageClient(
		'pug-language-server',
		'Pug Language Server',
		serverOptions,
		clientOptions,
	);
	client.start();

	const labsInfo = createLabsInfo(serverProtocol);
	labsInfo.addLanguageClient(client);

	return labsInfo.extensionExports;
}

export function deactivate(): Thenable<any> | undefined {
	return client?.stop();
}
