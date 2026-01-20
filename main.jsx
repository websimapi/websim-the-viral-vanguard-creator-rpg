import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { GameScene } from "./Components/World.jsx";
import { HUD, QuestModal } from "./Components/HUD.jsx";
import { useGameStore } from "./store.js";
const App = () => {
  const { init, user } = useGameStore();
  const [started, setStarted] = useState(false);
  useEffect(() => {
    init();
    const audio = new Audio("ambience.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    const playAudio = () => {
      audio.play().catch((e) => console.log("Audio waiting for interaction"));
    };
    document.addEventListener("click", playAudio, { once: true });
    return () => {
      audio.pause();
    };
  }, []);
  if (!user) return /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "white" }, children: "CONNECTING TO NEURAL LINK..." }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 31,
    columnNumber: 23
  });
  if (!started) {
    return /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(180deg, #050510 0%, #1a1a40 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      zIndex: 1e3
    }, children: [
      /* @__PURE__ */ jsxDEV("h1", { style: { fontFamily: '"Press Start 2P", cursive', color: "#4d4dff", textShadow: "0 0 20px #4d4dff", fontSize: "3rem", textAlign: "center", marginBottom: "10px" }, children: "THE VIRAL VANGUARD" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 41,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("h2", { style: { fontFamily: "Rajdhani", fontWeight: 300, letterSpacing: "5px" }, children: "CREATOR RPG SYSTEM" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 42,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { style: { maxWidth: "600px", textAlign: "center", margin: "40px", lineHeight: "1.6", color: "#aaa" }, children: [
        "Welcome, ",
        /* @__PURE__ */ jsxDEV("b", { children: user.username }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 45,
          columnNumber: 30
        }),
        ". ",
        /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 45,
          columnNumber: 54
        }),
        /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 45,
          columnNumber: 59
        }),
        "Your work is no longer just work. It is a quest for dominance in the algorithm. Walk the halls of the Studio. Complete tasks to earn XP. Ascend the ranks."
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 44,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setStarted(true),
          style: {
            background: "#4d4dff",
            border: "none",
            color: "white",
            padding: "20px 40px",
            fontSize: "20px",
            fontFamily: '"Press Start 2P", cursive',
            cursor: "pointer",
            boxShadow: "0 0 30px #4d4dff",
            transition: "transform 0.2s"
          },
          onMouseOver: (e) => e.target.style.transform = "scale(1.05)",
          onMouseOut: (e) => e.target.style.transform = "scale(1)",
          children: "ENTER STUDIO"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 50,
          columnNumber: 17
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 35,
      columnNumber: 13
    });
  }
  return /* @__PURE__ */ jsxDEV("div", { style: { width: "100vw", height: "100vh" }, children: [
    /* @__PURE__ */ jsxDEV(Canvas, { shadows: true, dpr: [1, 2], children: /* @__PURE__ */ jsxDEV(GameScene, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 75,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 74,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(HUD, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 77,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(QuestModal, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 78,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 73,
    columnNumber: 9
  });
};
const root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 84,
  columnNumber: 13
}));
