# QR Code encoder — third-party attribution

This directory contains the QR code encoding engine (matrix generation,
Reed-Solomon error correction, mask pattern selection) from
**"QRCode for JavaScript"** by Kazuhiko Arase, MIT licensed.

Original source: http://www.d-project.com/
License: http://www.opensource.org/licenses/mit-license.php

Converted from CommonJS to ES modules for use in this project. No changes
were made to the actual encoding logic — only the module import/export
syntax was converted, verified via a full encode-then-decode round-trip
test (OpenCV's QRCodeDetector) before use.

"QR Code" is a registered trademark of DENSO WAVE INCORPORATED.
