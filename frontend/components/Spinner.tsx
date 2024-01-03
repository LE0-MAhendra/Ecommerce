import React from "react";
import { FidgetSpinner } from "react-loader-spinner";
const Spinner = () => {
  return (
    <section className="h-[90vh] w-full flex justify-center items-center z-30 bg-none">
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
      />
    </section>
  );
};

export default Spinner;
