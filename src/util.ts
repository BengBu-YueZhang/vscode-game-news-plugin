import * as vscode from 'vscode';
import * as path from 'path';
import * as pug from 'pug';
import { INews } from './api';
import { NewsRange } from './news';

export interface IData {
    [key: string]: any;
}

export function handleError (
    context: vscode.ExtensionContext,
    error: any,
    title: string
) {
    const panel = vscode.window.createWebviewPanel(
        'error',
        title,
        vscode.ViewColumn.One
    );
    const webviewDir = path.join(context.extensionPath, 'views');
    const tpl = path.join(webviewDir, 'error.pug');
    panel.webview.html = pug.renderFile(tpl); 
}

export function getTString (t: number): string {
    const ct = new Date(t);
    const year = ct.getFullYear();
    const month = ct.getMonth() + 1;
    const day = ct.getDate();
    const hours = ct.getHours();
    return `${year}-${month}-${day}-${hours}`;
}

export function getLocalURI (
    context: vscode.ExtensionContext,
    filePath: string
) {
    const webviewDir = path.join(context.extensionPath, 'views');
    return vscode.Uri.file(path.join(webviewDir, ...filePath.split('/'))).with({
        scheme: 'vscode-resource'
    });
}

export function getPugOptions (
    context: vscode.ExtensionContext,
    GlobalData: IData
) {
    return {
        GLOBAL_DATA: JSON.stringify(GlobalData),
        js: {
            vue: getLocalURI(context, 'js/vue.js'),
            main: getLocalURI(context, 'js/main.js')
        },
        css: {
            reset: getLocalURI(context, 'css/reset.css'),
            main: getLocalURI(context, 'css/main.css')
        }
    };
}

export function filterNewsRange (news: INews[], range: NewsRange): INews[] {
    switch (range) {
        case 'IGN':
            return news.filter(n => n.source === 'IGN');
        case '机核网':
            return news.filter(n => n.source === 'Gcores');
        case '游民星空':
            return news.filter(n => n.source === 'Gamersky');
        case 'All':
        default:
            return news;
    }
}
