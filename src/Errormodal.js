import React from "react";

export default function ErrorModal({ errorCode, errorMessage, onClose }) {
  return (
    <div className="error-modal">
      <div className="error-modal-content">
        <h2>Error</h2>
        <p>Status Code: {errorCode}</p>
        <p>{errorMessage}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
