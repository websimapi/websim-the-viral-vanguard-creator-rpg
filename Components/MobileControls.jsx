import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useRef } from "react";
import nipplejs from "nipplejs";
window.joystick = { x: 0, y: 0 };
window.look = { x: 0, y: 0 };
const MobileControls = () => {
  const joystickManager = useRef(null);
  const [isTouch, setIsTouch] = React.useState(false);
  const lastTouch = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(touch);
    if (!touch) return;
    const zone = document.getElementById("joystick-zone");
    if (zone) {
      joystickManager.current = nipplejs.create({
        zone,
        mode: "static",
        position: { left: "80px", bottom: "80px" },
        color: "white",
        size: 100
      });
      joystickManager.current.on("move", (evt, data) => {
        if (data && data.vector) {
          window.joystick = {
            x: data.vector.x,
            y: data.vector.y
          };
        }
      });
      joystickManager.current.on("end", () => {
        window.joystick = { x: 0, y: 0 };
      });
    }
    const lookZone = document.getElementById("look-zone");
    const handleTouchStart = (e) => {
      const touch2 = e.changedTouches[0];
      lastTouch.current = { x: touch2.clientX, y: touch2.clientY };
    };
    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch2 = e.changedTouches[0];
      const deltaX = touch2.clientX - lastTouch.current.x;
      const deltaY = touch2.clientY - lastTouch.current.y;
      window.look.x += deltaX;
      window.look.y += deltaY;
      lastTouch.current = { x: touch2.clientX, y: touch2.clientY };
    };
    if (lookZone) {
      lookZone.addEventListener("touchstart", handleTouchStart, { passive: false });
      lookZone.addEventListener("touchmove", handleTouchMove, { passive: false });
    }
    return () => {
      if (joystickManager.current) joystickManager.current.destroy();
      if (lookZone) {
        lookZone.removeEventListener("touchstart", handleTouchStart);
        lookZone.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);
  if (!isTouch) return null;
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("div", { id: "joystick-zone", style: {
      position: "absolute",
      bottom: "20px",
      left: "20px",
      width: "150px",
      height: "150px",
      zIndex: 20,
      pointerEvents: "auto"
    } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 81,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { id: "look-zone", style: {
      position: "absolute",
      top: "100px",
      // Below Top HUD
      right: 0,
      width: "50%",
      height: "calc(100% - 100px)",
      zIndex: 10,
      pointerEvents: "auto"
    } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 92,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(
      "div",
      {
        style: {
          position: "absolute",
          bottom: "60px",
          right: "30px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.15)",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          zIndex: 21,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
          backdropFilter: "blur(4px)"
        },
        onTouchStart: (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.dispatchEvent(new KeyboardEvent("keydown", { key: "e" }));
          setTimeout(() => window.dispatchEvent(new KeyboardEvent("keyup", { key: "e" })), 100);
        },
        children: /* @__PURE__ */ jsxDEV("span", { style: { fontSize: "24px", fontWeight: "bold", color: "white" }, children: "E" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 128,
          columnNumber: 17
        })
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 103,
        columnNumber: 13
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 79,
    columnNumber: 9
  });
};
export {
  MobileControls
};
