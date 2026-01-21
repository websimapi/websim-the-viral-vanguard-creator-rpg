import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useRef, useState, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Text, Float, Sparkles, PerspectiveCamera, PointerLockControls, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "../store.js";
function Player() {
  const { camera } = useThree();
  const [velocity] = useState(new THREE.Vector3());
  const [direction] = useState(new THREE.Vector3());
  const moveSpeed = 10;
  const keys = useRef({ w: false, a: false, s: false, d: false });
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
          keys.current.w = true;
          break;
        case "a":
          keys.current.a = true;
          break;
        case "s":
          keys.current.s = true;
          break;
        case "d":
          keys.current.d = true;
          break;
      }
    };
    const handleKeyUp = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
          keys.current.w = false;
          break;
        case "a":
          keys.current.a = false;
          break;
        case "s":
          keys.current.s = false;
          break;
        case "d":
          keys.current.d = false;
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  useFrame((state, delta) => {
    const keyZ = Number(keys.current.w) - Number(keys.current.s);
    const keyX = Number(keys.current.d) - Number(keys.current.a);
    const joy = window.joystick || { x: 0, y: 0 };
    const joyZ = joy.y;
    const joyX = joy.x;
    direction.z = keyZ + joyZ;
    direction.x = keyX + joyX;
    const look = window.look || { x: 0, y: 0 };
    if (look.x !== 0 || look.y !== 0) {
      const sensitivity = 5e-3;
      camera.rotation.order = "YXZ";
      camera.rotation.y -= look.x * sensitivity;
      camera.rotation.x -= look.y * sensitivity;
      camera.rotation.x = Math.max(-1.5, Math.min(1.5, camera.rotation.x));
      window.look.x = 0;
      window.look.y = 0;
    }
    if (direction.length() > 1) direction.normalize();
    if (direction.lengthSq() > 0.01) {
      velocity.z -= direction.z * moveSpeed * delta;
      velocity.x -= direction.x * moveSpeed * delta;
    }
    camera.translateX(-velocity.x * delta * 5);
    camera.translateZ(velocity.z * delta * 5);
    camera.position.y = 1.6;
    velocity.x -= velocity.x * 10 * delta;
    velocity.z -= velocity.z * 10 * delta;
  });
  return null;
}
const Station = ({ position, color, label, type }) => {
  const { openStation, activeStation } = useGameStore();
  const group = useRef();
  const [hovered, setHover] = useState(false);
  const { camera } = useThree();
  useFrame(() => {
    if (!group.current) return;
    const dist = camera.position.distanceTo(group.current.position);
    if (dist < 3) {
      if (!hovered) setHover(true);
    } else {
      if (hovered) setHover(false);
    }
  });
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (hovered && e.key.toLowerCase() === "e" && !activeStation) {
        openStation(type);
        new Audio("click.mp3").play();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hovered, activeStation, type]);
  return /* @__PURE__ */ jsxDEV("group", { ref: group, position, children: [
    /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.1, 0], children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [2, 0.2, 1] }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 129,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#222" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 130,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 128,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0, 1.5, -0.4], children: [
      /* @__PURE__ */ jsxDEV("planeGeometry", { args: [1.8, 1] }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 135,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color, emissive: color, emissiveIntensity: 2 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 136,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 134,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(Float, { speed: 2, rotationIntensity: 0.1, floatIntensity: 0.5, children: /* @__PURE__ */ jsxDEV(Billboard, { follow: true, lockX: false, lockY: false, lockZ: false, children: [
      /* @__PURE__ */ jsxDEV(
        Text,
        {
          position: [0, 2.5, 0],
          fontSize: 0.4,
          color,
          anchorX: "center",
          anchorY: "middle",
          children: label
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 142,
          columnNumber: 21
        }
      ),
      hovered && /* @__PURE__ */ jsxDEV(
        Text,
        {
          position: [0, 2.1, 0],
          fontSize: 0.2,
          color: "white",
          anchorX: "center",
          anchorY: "middle",
          children: "[PRESS E]"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 152,
          columnNumber: 25
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 141,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 140,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(Sparkles, { count: 20, scale: 3, size: 4, speed: 0.4, opacity: 0.5, color }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 165,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("pointLight", { distance: 3, intensity: 5, color, position: [0, 1, 0] }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 168,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 126,
    columnNumber: 9
  });
};
const GameScene = () => {
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("color", { attach: "background", args: ["#050510"] }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 178,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("fog", { attach: "fog", args: ["#050510", 5, 30] }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 179,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(PerspectiveCamera, { makeDefault: true, position: [0, 1.6, 5] }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 181,
      columnNumber: 13
    }),
    !isTouch && /* @__PURE__ */ jsxDEV(PointerLockControls, { selector: "#root" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 182,
      columnNumber: 26
    }),
    /* @__PURE__ */ jsxDEV(Player, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 183,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("hemisphereLight", { intensity: 0.5, groundColor: "#000000" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 186,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("ambientLight", { intensity: 0.4 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 187,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("pointLight", { position: [10, 10, 10], intensity: 1.5 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 188,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("pointLight", { position: [-10, 5, -10], intensity: 0.5, color: "#4d4dff" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 189,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("mesh", { rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0], children: [
      /* @__PURE__ */ jsxDEV("planeGeometry", { args: [50, 50] }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 193,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#0a0a20", roughness: 0.2, metalness: 0.5 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 194,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 192,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("gridHelper", { args: [50, 50, 5066239, 1118481] }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 198,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(Station, { position: [-5, 0, -2], rotation: [0, Math.PI / 4, 0], color: "#ff00ff", label: "IDEA ALTAR", type: "whiteboard" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 203,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(Station, { position: [0, 0, -5], color: "#00d4ff", label: "RENDER CORE", type: "computer" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 206,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(Station, { position: [5, 0, -2], color: "#00ff00", label: "THE VOID", type: "greenscreen" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 209,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("mesh", { position: [-10, 5, -10], children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [2, 10, 2] }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 213,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#111" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 214,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 212,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("mesh", { position: [10, 5, -10], children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [2, 10, 2] }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 217,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#111" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 218,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 216,
      columnNumber: 13
    }),
    !isTouch && /* @__PURE__ */ jsxDEV(Float, { speed: 2, rotationIntensity: 0, floatIntensity: 0.5, children: /* @__PURE__ */ jsxDEV(
      Text,
      {
        position: [0, 1.6, 3],
        fontSize: 0.2,
        color: "white",
        anchorX: "center",
        anchorY: "middle",
        fillOpacity: 0.8,
        children: "CLICK TO ENABLE CAMERA"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 223,
        columnNumber: 21
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 222,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 177,
    columnNumber: 9
  });
};
export {
  GameScene
};
