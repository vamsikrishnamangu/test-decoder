//@ts-nocheck
import { useEffect, useRef } from "react";
export default function Home() {
  const readerRef = useRef(null);
  const resultRef = useRef(null);
  const showRef = useRef(null);
  useEffect(() => {
    let scannerStarted = false;
    let readerElement = readerRef.current;
    if (readerElement) {
      const html5Qrcode = new Html5Qrcode(readerElement.id);

      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        if (decodedText && showRef.current && resultRef.current) {
          showRef.current.style.display = "block";
          resultRef.current.href = decodedText;
          resultRef.current.textContent = decodedText;
          html5Qrcode.stop().catch((error) => console.error(error));
        }
      };

      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      html5Qrcode
        .start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
        .then(() => {
          scannerStarted = true;
        })
        .catch((err) => {
          console.error(err);
        });

      return () => {
        if (scannerStarted) {
          html5Qrcode.stop().catch((err) => {
            console.error(err);
            alert("Error starting the scanner: " + err.message);
          });
        }
        if (readerElement) {
          readerElement.innerHTML = "";
        }
      };
    }
  }, []);
  return (
    <>
      <>
        <p>Scan the QR code</p>
        <div style={{ textAlign: "center" }}>
          <div id="reader" ref={readerRef} style={{ width: "500px" }}></div>
          <div ref={showRef} style={{ display: "none" }}>
            <h4>Scanned Result</h4>
            <a style={{ color: "blue" }} ref={resultRef}></a>
          </div>
        </div>
      </>
    </>
  );
}
