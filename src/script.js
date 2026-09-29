/**
 * Base64 Encoder / Decoder - Client-side Application Logic
 * Author: Veermaniyan.B
 * Project: DevOps Base64 Application
 */

// --- Base64 Core Utility Functions (Exportable / Testable) ---

/**
 * Safely encodes a string into Base64 supporting Unicode (UTF-8)
 * @param {string} str - Plain text input
 * @returns {string} - Base64 encoded string
 */
function encodeBase64(str) {
  if (!str && str !== "") {
    throw new Error("Input string is invalid.");
  }
  if (str.length === 0) {
    throw new Error("Input text cannot be empty.");
  }
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Safely decodes a Base64 string back to original UTF-8 text
 * @param {string} base64Str - Base64 encoded input
 * @returns {string} - Decoded plain text
 */
function decodeBase64(base64Str) {
  if (!base64Str || !base64Str.trim()) {
    throw new Error("Base64 input string cannot be empty.");
  }
  // Sanitize whitespace/newlines
  const sanitized = base64Str.trim().replace(/\s+/g, "");
  
  // Basic format validation via regex
  const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
  if (!base64Regex.test(sanitized)) {
    throw new Error("Invalid Base64 format. Contains illegal characters or invalid padding.");
  }

  try {
    const binary = atob(sanitized);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (err) {
    throw new Error("Failed to decode string: Invalid Base64 structure.");
  }
}

/**
 * Formats byte size into human readable string (KB, MB)
 * @param {number} bytes 
 * @returns {string}
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Module export for Node.js unit tests (browser ignores this)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { encodeBase64, decodeBase64, formatFileSize };
}

// --- Browser DOM Controller ---
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Tab Elements
    const tabTextBtn = document.getElementById('tabTextBtn');
    const tabFileBtn = document.getElementById('tabFileBtn');
    const textSection = document.getElementById('textSection');
    const fileSection = document.getElementById('fileSection');

    // Text Elements
    const textInput = document.getElementById('textInput');
    const textOutput = document.getElementById('textOutput');
    const textInputCount = document.getElementById('textInputCount');
    const textOutputCount = document.getElementById('textOutputCount');
    const btnEncodeText = document.getElementById('btnEncodeText');
    const btnDecodeText = document.getElementById('btnDecodeText');
    const btnSwapText = document.getElementById('btnSwapText');
    const btnCopyText = document.getElementById('btnCopyText');
    const btnClearText = document.getElementById('btnClearText');
    const btnLoadSampleText = document.getElementById('btnLoadSampleText');

    // File Elements
    const fileDropzone = document.getElementById('fileDropzone');
    const fileInputSelect = document.getElementById('fileInputSelect');
    const fileInfoCard = document.getElementById('fileInfoCard');
    const metaFileName = document.getElementById('metaFileName');
    const metaFileType = document.getElementById('metaFileType');
    const metaFileSize = document.getElementById('metaFileSize');
    const metaFileModified = document.getElementById('metaFileModified');
    const btnRemoveFile = document.getElementById('btnRemoveFile');
    const fileBase64Output = document.getElementById('fileBase64Output');
    const fileBase64Count = document.getElementById('fileBase64Count');
    const btnCopyFileBase64 = document.getElementById('btnCopyFileBase64');
    const btnDownloadDecodedFile = document.getElementById('btnDownloadDecodedFile');
    const btnClearFileSection = document.getElementById('btnClearFileSection');

    // Toast Container
    const toastNotification = document.getElementById('toastNotification');

    let selectedFile = null;

    // Toast notification helper
    function showToast(message, type = 'info') {
      toastNotification.textContent = message;
      toastNotification.className = `toast toast-${type}`;
      toastNotification.classList.remove('hidden');
      
      setTimeout(() => {
        toastNotification.classList.add('hidden');
      }, 3500);
    }

    // Helper: Update character counters
    function updateCounters() {
      textInputCount.textContent = `${textInput.value.length} chars`;
      textOutputCount.textContent = `${textOutput.value.length} chars`;
      fileBase64Count.textContent = `${fileBase64Output.value.length} chars`;
    }

    // Tab Navigation
    tabTextBtn.addEventListener('click', () => {
      tabTextBtn.classList.add('active');
      tabFileBtn.classList.remove('active');
      textSection.classList.add('active');
      fileSection.classList.remove('active');
    });

    tabFileBtn.addEventListener('click', () => {
      tabFileBtn.classList.add('active');
      tabTextBtn.classList.remove('active');
      fileSection.classList.add('active');
      textSection.classList.remove('active');
    });

    // Text Input Counter listener
    textInput.addEventListener('input', updateCounters);
    fileBase64Output.addEventListener('input', updateCounters);

    // Text Encode
    btnEncodeText.addEventListener('click', () => {
      try {
        const input = textInput.value;
        const result = encodeBase64(input);
        textOutput.value = result;
        updateCounters();
        showToast('Successfully encoded text to Base64!', 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });

    // Text Decode
    btnDecodeText.addEventListener('click', () => {
      try {
        const input = textInput.value;
        const result = decodeBase64(input);
        textOutput.value = result;
        updateCounters();
        showToast('Successfully decoded Base64 text!', 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });

    // Swap Text
    btnSwapText.addEventListener('click', () => {
      const temp = textInput.value;
      textInput.value = textOutput.value;
      textOutput.value = temp;
      updateCounters();
      showToast('Swapped input and output.', 'info');
    });

    // Copy Text Result
    btnCopyText.addEventListener('click', () => {
      if (!textOutput.value) {
        showToast('Nothing to copy!', 'error');
        return;
      }
      navigator.clipboard.writeText(textOutput.value).then(() => {
        showToast('Result copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Failed to copy text.', 'error');
      });
    });

    // Clear Text
    btnClearText.addEventListener('click', () => {
      textInput.value = '';
      textOutput.value = '';
      updateCounters();
      showToast('Text fields cleared.', 'info');
    });

    // Load Sample Text
    btnLoadSampleText.addEventListener('click', () => {
      textInput.value = 'Hello World! Base64 DevOps Pipeline by Veermaniyan.B (Hello 世界)';
      textOutput.value = '';
      updateCounters();
      showToast('Sample string loaded into input.', 'info');
    });

    // --- File Handling ---
    fileDropzone.addEventListener('click', () => fileInputSelect.click());

    fileDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileDropzone.classList.add('dragover');
    });

    fileDropzone.addEventListener('dragleave', () => {
      fileDropzone.classList.remove('dragover');
    });

    fileDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      fileDropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    });

    fileInputSelect.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
      }
    });

    function handleFileSelect(file) {
      selectedFile = file;
      
      // Update File Info Display
      metaFileName.textContent = file.name || 'Unnamed file';
      metaFileType.textContent = file.type || 'application/octet-stream';
      metaFileSize.textContent = formatFileSize(file.size);
      metaFileModified.textContent = file.lastModified ? new Date(file.lastModified).toLocaleString() : 'N/A';
      
      fileInfoCard.classList.remove('hidden');

      // Read File as Data URL (Base64)
      const reader = new FileReader();
      reader.onload = function(e) {
        const dataUrl = e.target.result;
        // Data URL format: "data:image/png;base64,iVBORw0KG..." -> split at comma
        const base64Content = dataUrl.split(',')[1] || dataUrl;
        fileBase64Output.value = base64Content;
        updateCounters();
        showToast(`File "${file.name}" encoded to Base64!`, 'success');
      };

      reader.onerror = function() {
        showToast('Error reading selected file.', 'error');
      };

      reader.readAsDataURL(file);
    }

    btnRemoveFile.addEventListener('click', () => {
      selectedFile = null;
      fileInputSelect.value = '';
      fileInfoCard.classList.add('hidden');
      fileBase64Output.value = '';
      updateCounters();
      showToast('File removed.', 'info');
    });

    btnCopyFileBase64.addEventListener('click', () => {
      if (!fileBase64Output.value) {
        showToast('No Base64 data to copy!', 'error');
        return;
      }
      navigator.clipboard.writeText(fileBase64Output.value).then(() => {
        showToast('Base64 string copied!', 'success');
      }).catch(() => {
        showToast('Failed to copy Base64 string.', 'error');
      });
    });

    // File Decode and Download
    btnDownloadDecodedFile.addEventListener('click', () => {
      const base64Data = fileBase64Output.value.trim();
      if (!base64Data) {
        showToast('Please provide Base64 data to decode into a file.', 'error');
        return;
      }

      try {
        // Strip data prefix if present (e.g., data:image/png;base64,)
        const rawBase64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
        
        // Convert to binary array
        const binaryStr = atob(rawBase64.replace(/\s+/g, ""));
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }

        const mimeType = selectedFile ? selectedFile.type : 'application/octet-stream';
        const blob = new Blob([bytes], { type: mimeType });
        const downloadUrl = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = selectedFile ? `decoded_${selectedFile.name}` : 'decoded_file.bin';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);

        showToast('File decoded and download initiated!', 'success');
      } catch (err) {
        showToast('Failed to decode Base64 into file. Invalid Base64 encoding.', 'error');
      }
    });

    btnClearFileSection.addEventListener('click', () => {
      selectedFile = null;
      fileInputSelect.value = '';
      fileInfoCard.classList.add('hidden');
      fileBase64Output.value = '';
      updateCounters();
      showToast('File section reset.', 'info');
    });
  });
}
