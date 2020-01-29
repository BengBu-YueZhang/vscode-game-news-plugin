import * as vscode from 'vscode';
import {
    handleError
} from './util';
import * as pug from 'pug';
import * as path from 'path';
import api from './api';

export type NewsRange = 'IGN' | '机核网' | '游民星空' | 'All';

export default async function news (
    context: vscode.ExtensionContext,
    viewType: string,
    title: string,
    newRange: NewsRange
) {
    try {
        const data = await vscode.window.withProgress({
            title: '🎮游戏新闻加载中',
            location: vscode.ProgressLocation.Notification
        }, async () => {
            return await api();
        });
        const webviewDir = path.resolve(__dirname, './../views');
        const panel = vscode.window.createWebviewPanel(
            viewType,
            title,
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [vscode.Uri.file(path.resolve(__dirname, webviewDir))]
            }
        );
        const tpl = path.resolve(__dirname, './../views/index.pug');
        panel.webview.html = pug.renderFile(tpl, {
        }); 
    } catch (error) {
        handleError(error, title);
    }   
}
