# ⚡ UPI QR Code Generator for VS Code

यह extension आपको Visual Studio Code के भीतर से ही तुरंत **UPI (Unified Payments Interface) QR Code** generate करने में मदद करता है। किसी third-party website पर जाने की ज़रूरत नहीं—सिर्फ अपनी UPI ID और Amount डालें, और QR Code आपके सामने!

## ✨ Features

* **Quick QR Generation:** एक single command से UPI ID और optional Amount input लेकर QR code generate करें।
* **Webview Display:** QR Code एक dedicated Webview Panel में साफ़-साफ़ Display होता है, जिसे आप आसानी से share या scan कर सकते हैं।
* **Supports Optional Amount:** आप fixed amount के साथ या बिना amount के QR Code बना सकते हैं।

### 📸 Screenshot in Action

**Step 1: Command Palette में `UPI: Generate QR Code` run करना**


**Step 2: UPI ID और Amount Input देना**


**Step 3: Generated QR Code**


---

## 🛠️ How to Use

1.  **Command Palette खोलें:** `Ctrl+Shift+P` (Windows/Linux) या `Cmd+Shift+P` (macOS) दबाएँ।
2.  **Command चलाएँ:** टाइप करें **`UPI: Generate QR Code`** और Enter दबाएँ।
3.  **Input दें:**
    * **UPI ID:** अपनी या प्राप्तकर्ता की UPI ID डालें (e.g., `example@bankname`)।
    * **Amount:** वह राशि (amount) डालें जिसके लिए QR Code बनाना है। (यह optional है—अगर खाली छोड़ेंगे तो user कोई भी amount scan कर पाएगा)।
4.  **Scan करें:** QR Code तुरंत एक नए panel में दिखाई देगा। इसे अपने पसंदीदा UPI App से scan करके test करें।

---

## ⚠️ Requirements

इस extension को चलाने के लिए किसी विशेष dependency की आवश्यकता नहीं है। यह सीधे VS Code API और **public QR code generation service** (जैसे QuickChart) का उपयोग करता है। इसलिए, QR Code generate करने के लिए आपके VS Code को **Internet** से कनेक्टेड होना आवश्यक है।

---

## 📝 Release Notes

### 1.0.0 (Initial Release)

* `upi.generateQR` command जोड़ा गया।
* UPI ID और Amount के लिए user input लेना।
* UPI Deeplink URL के आधार पर QR Code generate और Webview में display करना।

---

**अगर आपको यह extension पसंद आया हो, तो इसे ⭐ star rating ज़रूर दें!**