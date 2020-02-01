import * as vscode from 'vscode';
import news from './news';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {

	const IGN = vscode.commands.registerCommand('game.IGN', () => {
		news(context, 'ign', 'IGN', 'IGN');
	});

	const 机核网 = vscode.commands.registerCommand('game.机核网', () => {
		news(context, 'gcores', '机核网', '机核网');
	});

	const 游民星空 = vscode.commands.registerCommand('game.游民星空', () => {
		news(context, 'gamersky', '游民星空', '游民星空');
	});

	const GameNews = vscode.commands.registerCommand('game.GameNews', () => {
		news(context, 'newslist', '游戏新闻', 'All');
	});

	context.subscriptions.push(IGN);
	context.subscriptions.push(机核网);
	context.subscriptions.push(游民星空);
	context.subscriptions.push(GameNews);
}

export function deactivate() {
	vscode.window.showInformationMessage('Bye bye!');
}
