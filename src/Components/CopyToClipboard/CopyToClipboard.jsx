import { useState, useEffect } from "react";

export default function CopyToClipboard({ hexCode }) {
  const [copied, setCopied] = useState(false);

  async function handleCopyClick() {
    try {
      await navigator.clipboard.writeText(hexCode); 
      setCopied(true); 
    } catch (error) {
      console.error("Failed to copy hex code: ", error);
    }
  }

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false); 
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [copied]);

  return (
    <div>
      <button onClick={handleCopyClick}>Copy to Clipboard</button>
      {copied && <p className="confirmation-message">#hex color copied successfully!</p>}
    </div>
  );
}