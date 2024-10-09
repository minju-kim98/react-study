import React from "react";

const ErrorBanner = ({ message }) => {
  let errorMessage = message || "에러가 발생했습니다.";
  return (
    <div
      style={{
        backgroundColor: "lightcoral",
        padding: "10px",
        margin: "20px",
        borderRadius: "5px",
        color: "white",
      }}
    >
      {errorMessage}
    </div>
  );
};

export default ErrorBanner;
