import React from "react";
import "./ErrorModal.css";

export default function ErrorModal({ errorMessage, onClose }) {
  return (
    <div className="error-modal-overlay">
      <div className="error-modal">
        <div className="error-modal-content">
          <h2>That's not a city!</h2>
          <p>Please try again with a different city name.</p>
          <p>{errorMessage}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
