//@ts-nocheck
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    let scannerStarted = false;
    const html5Qrcode = new Html5Qrcode("reader");

    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      if (decodedText) {
        document.getElementById("show").style.display = "block";
        document.getElementById("result").textContent = decodedText;
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

    // Cleanup on component unmount
    return () => {
      if (scannerStarted) {
        html5Qrcode.stop().catch((err) => {
          console.error(err);
          alert("Error starting the scanner: " + err.message); // Display error to users
        });
      }
      const readerDiv = document.getElementById("reader");
      if (readerDiv) {
        readerDiv.innerHTML = ""; // Clear the inner contents of the reader div
      }
    };
  }, []);

  return (
    <>
      <p>scan the qr code</p>
      <div style={{ textAlign: "center" }}>
        <div id="reader" style={{ width: "500px" }}></div>
        <div id="show" style={{ display: "none" }}>
          <h4>Scanned Result</h4>
          <p style={{ color: "blue" }} id="result"></p>
        </div>
      </div>
    </>
  );
}
