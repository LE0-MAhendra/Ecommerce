import React from "react";

const Spinner = () => {
  return (
    <button type="button" className="w-full" disabled>
      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
    </button>
  );
};

export default Spinner;
