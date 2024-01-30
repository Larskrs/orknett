import React, { useEffect, useState } from "react";
import styles from "./ClipboardWrap.module.css";

export default function ClipboardWrap({ data, children }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy to clipboard", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <React.Suspense fallback={<></>}>
      <div>
        <div className={styles.container}>
          <div className={styles.content} onClick={handleCopyToClipboard}>
            {children}
          </div>
          {copied && (
            <div className={styles.pop_up}>Copied to clipboard!</div>
          )}
        </div>
      </div>
    </React.Suspense>
  );
}
