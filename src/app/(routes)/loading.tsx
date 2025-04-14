import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 rounded-full border-4 border-greenish border-r-transparent animate-spin" />
    </div>
  );
};

export default Loading;
