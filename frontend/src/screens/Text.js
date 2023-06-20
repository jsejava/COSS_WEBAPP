import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
function Text() {
  return (
    <div className="App">
      <Tippy
        arrow={false}
        delay={1000}
        placement="right"
        content="basichsgshsjsjshwjwjwjwjwj"
      >
        <button>Hover</button>
      </Tippy>
    </div>
  );
}

export default Text;
