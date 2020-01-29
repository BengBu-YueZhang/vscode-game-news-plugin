import * as vscode from 'vscode';
import * as path from 'path';
import * as pug from 'pug';

export function handleError (error: any, title: string) {
    const panel = vscode.window.createWebviewPanel(
        'error',
        title,
        vscode.ViewColumn.One
    );
    const tpl = path.resolve(__dirname, './../views/error.pug');
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

export function getLocalURI () {
}
