import * as vscode from 'vscode';
import { jsonp } from './util';
import * as pug from 'pug';
import * as path from 'path';

export type NewsRange = 'IGN' | 'GameSpot' | '游民星空' | 'All';

export default function news (
    context: vscode.ExtensionContext,
    viewType: string,
    title: string,
    newRange: NewsRange
) {
    const panel = vscode.window.createWebviewPanel(
        viewType,
        title,
        vscode.ViewColumn.One,
        {}
    );
    const views = path.resolve(__dirname, './../views/index.htm');
    panel.webview.html = pug.renderFile(views);
}
