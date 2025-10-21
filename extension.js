// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    console.log('Congratulations, your extension "upi" is now active!');

    // नया command register करते हैं: upi.generateQR
    let disposable = vscode.commands.registerCommand('upi.generateQR', async function () {
        
        // Step 1: UPI ID Input लेना
        const upiId = await vscode.window.showInputBox({
            prompt: 'Enter UPI ID (e.g., example@bank)',
            placeHolder: 'UPI ID',
            ignoreFocusOut: true // Input box open रहे, focus lose होने पर बंद न हो
        });

        if (!upiId) {
            vscode.window.showWarningMessage('UPI ID is required to generate QR code.');
            return;
        }

        // Step 2: Amount Input लेना
        const amount = await vscode.window.showInputBox({
            prompt: 'Enter Amount (optional)',
            placeHolder: 'Amount (e.g., 100.50)',
            validateInput: text => {
                // यह check करता है कि input एक valid number है
                return (text === '' || !isNaN(Number(text))) ? null : 'Please enter a valid number for the amount.';
            },
            ignoreFocusOut: true
        });
        
        // Amount को encode करने से पहले clean करते हैं (अगर खाली है तो null)
        const finalAmount = amount ? parseFloat(amount).toFixed(2) : null;

        // Step 3: UPI Deeplink URL बनाना
        // UPI Deeplink format: upi://pay?pa={UPI ID}&pn={Payee Name}&mc={Merchant Code}&tr={Transaction ID}&tn={Note}&am={Amount}&cu=INR
        
        // हम सिर्फ UPI ID और Amount का इस्तेमाल करेंगे
        let upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=VSCodeUser&cu=INR`;
        
		if (finalAmount !== null && Number(finalAmount) > 0) {
			upiUrl += `&am=${finalAmount}`;
		}
        
        // console.log(`Generated UPI URL: ${upiUrl}`); // Debugging के लिए

        // Step 4: Webview Panel बनाना और QR Code दिखाना
        
        // Webview panel बनाने के लिए
        const panel = vscode.window.createWebviewPanel(
            'upiQrCode', // Internal ID
            'UPI QR Code: ' + upiId, // Panel Title
            vscode.ViewColumn.One, // Panel किस column में खुलेगा
            {
                enableScripts: true // Webview में JavaScript enable करना
            }
        );
        
        // Panel में HTML content सेट करना
        panel.webview.html = getWebviewContent(upiUrl);

    });

    context.subscriptions.push(disposable);
}

/**
 * Webview में दिखाने के लिए HTML content generate करना
 * @param {string} upiLink 
 */
function getWebviewContent(upiLink) {
    // QR Code generate करने के लिए, हम एक Public API (जैसे Quickchart या Google Charts) का इस्तेमाल करेंगे।
    // यहाँ Quickchart API का इस्तेमाल किया गया है।
    const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(upiLink)}&size=300&light=ffffff`;
    
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>UPI QR Code</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            h1 { color: #007acc; }
            .qr-container { border: 2px solid #ddd; padding: 20px; display: inline-block; background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
            .upi-link { margin-top: 15px; font-size: 14px; color: #555; word-break: break-all; }
            .amount { font-size: 18px; font-weight: bold; margin-top: 10px; color: #333; }
        </style>
    </head>
    <body>
        <div class="qr-container">
            <h1>Scan to Pay via UPI</h1>
            <p><strong>UPI ID:</strong> ${upiLink.match(/pa=([^&]*)/)[1]}</p>
            ${upiLink.includes('&am=') ? 
                `<p class="amount">Amount: ₹ ${upiLink.match(/am=([^&]*)/)[1]}</p>` : 
                '<p class="amount">Amount: Any</p>'}
            
            <img src="${qrCodeUrl}" alt="UPI QR Code" width="300" height="300"/>
            
            <p class="upi-link"><strong>Deeplink:</strong> ${upiLink}</p>
        </div>
    </body>
    </html>`;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}