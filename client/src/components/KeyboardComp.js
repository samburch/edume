import React from "react";

function KeyboardComp({ value, symbol, className, handleKeys, text }) {
  // Create new dom parser to render special character symbols like delete and return
  const parser = new DOMParser();
  const decodeStr = parser.parseFromString(
    `<!doctype html><body>${symbol}`,
    "text/html"
  ).body.textContent;

  return (
    <button value={value} onClick={handleKeys} className={className}>
      {decodeStr}
      <span>{text}</span>
    </button>
  );
}

export default KeyboardComp;
