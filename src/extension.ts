'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as config from './config';
import { DeclarationSupport } from './declaration';
import { HoverSupport } from './hover';
import { CompletionSupport } from './completion';
import { setup } from './diagnostics';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let flowPath;
    if (vscode.workspace.getConfiguration('flow').get('path')) {
        flowPath = vscode.workspace.getConfiguration('flow').get('path');
    }
    if (!flowPath) {
        return undefined;
    }
    config.configure();
    context.subscriptions.push(vscode.languages.registerDefinitionProvider('javascript', new DeclarationSupport(flowPath)));
    context.subscriptions.push(vscode.languages.registerHoverProvider('javascript', new HoverSupport()));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('javascript', new CompletionSupport(), '.'));
    // Diagnostics
    setup(context.subscriptions, flowPath);
}

// this method is called when your extension is deactivated
export function deactivate() { }