import React from "react";

export default function ErrorModal({ errorCode, errorMessage, onClose }) {
  return (
    <div className="error-modal">
      <div className="error-modal-content">
        <h2>That's not a city!</h2>
        <p>Please try again.</p>
        <p>{errorMessage}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
