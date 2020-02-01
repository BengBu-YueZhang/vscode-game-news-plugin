import * as vscode from 'vscode';
import {
    handleError,
    getPugOptions,
    filterNewsRange,
    open,
    getPluginOptions
} from './util';
import * as pug from 'pug';
import * as path from 'path';
import api from './api';
import axios from 'axios';

export type NewsRange = 'IGN' | '机核网' | '游民星空' | 'All';

export default async function news (
    context: vscode.ExtensionContext,
    viewType: string,
    title: string,
    newsRange: NewsRange
) {
    try {
        const { range = 1 } = vscode.workspace.getConfiguration("gamenews");
        const data = await vscode.window.withProgress({
            title: '🎮游戏新闻加载中',
            location: vscode.ProgressLocation.Notification
        }, async () => {
            const news = await api(range);
            return filterNewsRange(news, newsRange);
        });
        const webviewDir = path.join(context.extensionPath, 'views');
        const panel = vscode.window.createWebviewPanel(
            viewType,
            title,
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [vscode.Uri.file(webviewDir)]
            }
        );
        const tpl = path.join(webviewDir, 'index.pug');
        const options = getPugOptions(context, {
            news: data
        });
        panel.webview.html = pug.renderFile(tpl, options);
        panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'preview':
                    open(message.text);
                    return;
            }
        }, undefined, context.subscriptions);
    } catch (error) {
        handleError(context, error, title);
    }   
}
