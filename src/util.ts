import * as vscode from 'vscode';
import * as path from 'path';
import * as pug from 'pug';

export function jsonp () {
}

export function handleError (error: any, title: string) {
    const panel = vscode.window.createWebviewPanel(
        'error',
        title,
        vscode.ViewColumn.One
    );
    const tpl = path.resolve(__dirname, './../views/error.pug');
    panel.webview.html = pug.renderFile(tpl); 
}
