import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const IGN = vscode.commands.registerCommand('extension.IGN', () => {
		vscode.window.showInformationMessage('IGN');
	});

	const GameSpot = vscode.commands.registerCommand('extension.GameSpot', () => {
		vscode.window.showInformationMessage('GameSpot');
	});

	const 游民星空 = vscode.commands.registerCommand('extension.游民星空', () => {
		vscode.window.showInformationMessage('游民星空');
	});

	const GameNews = vscode.commands.registerCommand('extension.GameNews', () => {
		vscode.window.showInformationMessage('GameNews');
	});

	context.subscriptions.push(IGN);
	context.subscriptions.push(GameSpot);
	context.subscriptions.push(游民星空);
	context.subscriptions.push(GameNews);
}

export function deactivate() {
	vscode.window.showInformationMessage('Bye bye!');
}
