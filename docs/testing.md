# Testing & Quality Assurance Documentation

**Project:** Base64 Encoder / Decoder DevOps Pipeline  
**Author:** Veermaniyan.B  

---

## 1. Testing Strategy Overview

Quality assurance in this project spans three levels:
1. **Syntax Validation & Linting:** Evaluates JavaScript parse trees to ensure zero syntax errors before testing.
2. **Automated Unit Testing:** Verifies standard encoding, decoding, Unicode support, empty string handling, invalid Base64 formats, and file size formatting utilities.
3. **Post-Deployment Smoke Verification:** Validates that production artifacts exist and expected DOM markers exist in the deployment output.

---

## 2. Test Execution Commands

### Run Unit Tests
```powershell
npm test
```

### Run Syntax Linting
```powershell
npm run lint
```

### Run Post-Deployment Smoke Test
```powershell
npm run smoke-test
```

---

## 3. Automated Test Matrix

| Test ID | Test Category | Input Data | Expected Output | Status |
| :--- | :--- | :--- | :--- | :--- |
| **UT-01** | Standard Encode | `"Hello"` | `"SGVsbG8="` | PASSED |
| **UT-02** | Standard Encode | `"Hello World"` | `"SGVsbG8gV29ybGQ="` | PASSED |
| **UT-03** | Standard Decode | `"SGVsbG8="` | `"Hello"` | PASSED |
| **UT-04** | Standard Decode | `"SGVsbG8gV29ybGQ="` | `"Hello World"` | PASSED |
| **UT-05** | Unicode UTF-8 | `"Hello 世界"` | Encodes & Decodes cleanly | PASSED |
| **UT-06** | Validation | `""` (Empty String) | Throws `Input text cannot be empty.` | PASSED |
| **UT-07** | Invalid Base64 | `"!!!Invalid!!!"` | Throws `Invalid Base64 format` | PASSED |
| **UT-08** | Utility Formatting| `1048576` bytes | `"1 MB"` | PASSED |
| **ST-01** | Smoke Test | Production Files | `dist/index.html` exists & valid | PASSED |
