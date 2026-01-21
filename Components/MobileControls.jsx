import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useRef } from "react";
import nipplejs from "nipplejs";
window.joystick = { x: 0, y: 0 };
const MobileControls = () => {
  const manager = useRef(null);
  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouch) return;
    const zone = document.getElementById("joystick-zone");
    if (!zone) return;
    manager.current = nipplejs.create({
      zone,
      mode: "static",
      position: { left: "50%", bottom: "15%" },
      color: "white",
      size: 100
    });
    manager.current.on("move", (evt, data) => {
      if (data && data.vector) {
        window.joystick = {
          x: data.vector.x,
          y: data.vector.y
        };
      }
    });
    manager.current.on("end", () => {
      window.joystick = { x: 0, y: 0 };
    });
    return () => {
      if (manager.current) manager.current.destroy();
    };
  }, []);
  return /* @__PURE__ */ jsxDEV("div", { id: "joystick-zone", style: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "150px",
    height: "150px",
    zIndex: 10,
    pointerEvents: "auto"
  } }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 44,
    columnNumber: 9
  });
};
export {
  MobileControls
};
