import * as vscode from 'vscode';
import news, { NewsRange } from './news';

export function activate(context: vscode.ExtensionContext) {

	const IGN = vscode.commands.registerCommand('extension.IGN', () => {
		news(context, 'ign', 'IGN', 'IGN');
	});

	const GameSpot = vscode.commands.registerCommand('extension.GameSpot', () => {
		news(context, 'gamespot', 'GameSpot', 'GameSpot');
	});

	const 游民星空 = vscode.commands.registerCommand('extension.游民星空', () => {
		news(context, 'gamersky', '游民星空', '游民星空');
	});

	const GameNews = vscode.commands.registerCommand('extension.GameNews', () => {
		news(context, 'newslist', '游戏新闻', 'All');
	});

	context.subscriptions.push(IGN);
	context.subscriptions.push(GameSpot);
	context.subscriptions.push(游民星空);
	context.subscriptions.push(GameNews);
}

export function deactivate() {
	vscode.window.showInformationMessage('Bye bye!');
}
