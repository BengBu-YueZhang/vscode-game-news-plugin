import * as vscode from 'vscode';
import {
    handleError,
    getPugOptions,
    filterNewsRange
} from './util';
import * as pug from 'pug';
import * as path from 'path';
import api from './api';

export type NewsRange = 'IGN' | '机核网' | '游民星空' | 'All';

export default async function news (
    context: vscode.ExtensionContext,
    viewType: string,
    title: string,
    newsRange: NewsRange
) {
    try {
        const data = await vscode.window.withProgress({
            title: '🎮游戏新闻加载中',
            location: vscode.ProgressLocation.Notification
        }, async () => {
            const news = await api();
            return filterNewsRange(news, newsRange);
        });
        const webviewDir = path.resolve(context.extensionPath, './../views');
        const panel = vscode.window.createWebviewPanel(
            viewType,
            title,
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [vscode.Uri.file(path.resolve(context.extensionPath, webviewDir))]
            }
        );
        const tpl = path.resolve(context.extensionPath, './../views/index.pug');
        const options = getPugOptions(context, {
            news: data
        });
        panel.webview.html = pug.renderFile(tpl, options); 
    } catch (error) {
        handleError(context, error, title);
    }   
}
