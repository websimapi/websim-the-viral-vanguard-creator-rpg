import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect } from "react";
import { useGameStore, LEVELS } from "../store.js";
import { motion, AnimatePresence } from "framer-motion";
const HUD = () => {
  const { user, level, xp, gold, title, notifications } = useGameStore();
  const nextLevelXp = LEVELS[level] || 99999;
  const progress = xp / nextLevelXp * 100;
  return /* @__PURE__ */ jsxDEV("div", { style: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", padding: "20px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }, children: [
    /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", gap: "20px", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsxDEV("div", { style: {
        background: "rgba(0,0,0,0.8)",
        border: "2px solid #4d4dff",
        borderRadius: "10px",
        padding: "15px",
        display: "flex",
        gap: "15px",
        backdropFilter: "blur(5px)",
        minWidth: "300px"
      }, children: [
        /* @__PURE__ */ jsxDEV("div", { style: { width: "64px", height: "64px", background: "#333", borderRadius: "50%", overflow: "hidden", border: "2px solid gold" }, children: /* @__PURE__ */ jsxDEV("img", { src: user ? `https://images.websim.com/avatar/${user.username}` : "", alt: "Avatar", style: { width: "100%", height: "100%", objectFit: "cover" } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 27,
          columnNumber: 25
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 26,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxDEV("h2", { style: { margin: 0, fontSize: "18px", color: "#fff", textTransform: "uppercase" }, children: user?.username || "Player" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 30,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV("div", { style: { color: "#aaa", fontSize: "14px", marginBottom: "5px" }, children: [
            "Lvl ",
            level,
            " ",
            title
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 31,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", height: "10px", background: "#222", borderRadius: "5px", overflow: "hidden" }, children: /* @__PURE__ */ jsxDEV("div", { style: {
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #4d4dff, #00d4ff)",
            transition: "width 0.5s ease"
          } }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 35,
            columnNumber: 29
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 34,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV("div", { style: { fontSize: "10px", textAlign: "right", marginTop: "2px", color: "#888" }, children: [
            xp,
            " / ",
            nextLevelXp,
            " XP"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 42,
            columnNumber: 25
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 29,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 16,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { style: {
        background: "rgba(0,0,0,0.8)",
        border: "2px solid gold",
        borderRadius: "10px",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "gold",
        fontWeight: "bold",
        fontSize: "18px"
      }, children: [
        /* @__PURE__ */ jsxDEV("span", { children: "\u{1FA99}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 58,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("span", { children: gold }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 59,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 46,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 15,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { style: { position: "absolute", top: "150px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }, children: /* @__PURE__ */ jsxDEV(AnimatePresence, { children: notifications.map((n) => /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: 20, scale: 0.8 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20 },
        style: {
          background: n.type === "epic" ? "linear-gradient(45deg, gold, orange)" : "rgba(0, 20, 40, 0.9)",
          color: n.type === "epic" ? "black" : "#00d4ff",
          padding: "15px 30px",
          borderRadius: "8px",
          border: "1px solid #4d4dff",
          fontWeight: "bold",
          textShadow: "0 0 10px rgba(0,0,0,0.5)",
          boxShadow: "0 0 20px rgba(77, 77, 255, 0.3)"
        },
        children: n.message
      },
      n.id,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 67,
        columnNumber: 25
      }
    )) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 65,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 64,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { style: { textAlign: "center", color: "rgba(255,255,255,0.5)", paddingBottom: "20px" }, children: "WASD to Move \u2022 Mouse to Look \u2022 E to Interact" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 90,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 12,
    columnNumber: 9
  });
};
const QuestModal = () => {
  const { isModalOpen, activeStation, quests, closeModal, completeQuest, addCustomQuest } = useGameStore();
  const [newQuestText, setNewQuestText] = React.useState("");
  if (!isModalOpen) return null;
  const availableQuests = quests.filter((q) => q.location === activeStation && q.status === "active");
  const stationTitles = {
    "whiteboard": "STRATEGY SECTOR (Scripting)",
    "greenscreen": "THE VOID (Filming)",
    "computer": "RENDER CORE (Editing)"
  };
  const handleCreate = (e) => {
    e.preventDefault();
    if (!newQuestText.trim()) return;
    addCustomQuest(newQuestText, "Custom Task", activeStation);
    setNewQuestText("");
  };
  return /* @__PURE__ */ jsxDEV("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100
  }, children: /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      style: {
        width: "600px",
        maxHeight: "80vh",
        background: "#0a0a1f",
        border: "2px solid #4d4dff",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "0 0 50px rgba(77, 77, 255, 0.2)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        overflowY: "auto"
      },
      children: [
        /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #333", paddingBottom: "10px" }, children: [
          /* @__PURE__ */ jsxDEV("h2", { style: { margin: 0, color: "#00d4ff" }, children: stationTitles[activeStation] }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 144,
            columnNumber: 21
          }),
          /* @__PURE__ */ jsxDEV("button", { onClick: closeModal, style: { background: "none", border: "none", color: "#666", fontSize: "24px", cursor: "pointer" }, children: "\xD7" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 145,
            columnNumber: 21
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 143,
          columnNumber: 17
        }),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { style: { fontSize: "14px", color: "#888", textTransform: "uppercase" }, children: "Active Quests Here" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 149,
            columnNumber: 21
          }),
          /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }, children: [
            availableQuests.length === 0 && /* @__PURE__ */ jsxDEV("div", { style: { color: "#666", fontStyle: "italic" }, children: "No active quests for this station. Create one below!" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 151,
              columnNumber: 58
            }),
            availableQuests.map((q) => /* @__PURE__ */ jsxDEV("div", { style: {
              background: "rgba(255,255,255,0.05)",
              padding: "15px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderLeft: "4px solid gold"
            }, children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { style: { fontWeight: "bold", fontSize: "18px" }, children: q.title }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 164,
                  columnNumber: 37
                }),
                /* @__PURE__ */ jsxDEV("div", { style: { fontSize: "14px", color: "#aaa" }, children: q.description }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 165,
                  columnNumber: 37
                }),
                /* @__PURE__ */ jsxDEV("div", { style: { fontSize: "12px", color: "#4d4dff", marginTop: "5px" }, children: [
                  "Rewards: ",
                  q.xp,
                  " XP \u2022 ",
                  q.gold,
                  " Gold"
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 166,
                  columnNumber: 37
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 163,
                columnNumber: 33
              }),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => completeQuest(q.id),
                  style: {
                    background: "linear-gradient(45deg, #4d4dff, #00d4ff)",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(77, 77, 255, 0.4)"
                  },
                  children: "COMPLETE"
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 168,
                  columnNumber: 33
                }
              )
            ] }, q.id, true, {
              fileName: "<stdin>",
              lineNumber: 154,
              columnNumber: 29
            }))
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 150,
            columnNumber: 21
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 148,
          columnNumber: 17
        }),
        /* @__PURE__ */ jsxDEV("div", { style: { borderTop: "1px solid #333", paddingTop: "20px" }, children: [
          /* @__PURE__ */ jsxDEV("h3", { style: { fontSize: "14px", color: "#888", textTransform: "uppercase" }, children: "Assign New Task" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 189,
            columnNumber: 21
          }),
          /* @__PURE__ */ jsxDEV("form", { onSubmit: handleCreate, style: { display: "flex", gap: "10px" }, children: [
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                value: newQuestText,
                onChange: (e) => setNewQuestText(e.target.value),
                placeholder: "What task are you working on?",
                style: {
                  flex: 1,
                  background: "#111",
                  border: "1px solid #333",
                  padding: "10px",
                  borderRadius: "5px",
                  color: "white",
                  fontFamily: "inherit"
                },
                autoFocus: true
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 191,
                columnNumber: 25
              }
            ),
            /* @__PURE__ */ jsxDEV("button", { type: "submit", style: {
              background: "#333",
              color: "white",
              border: "none",
              padding: "0 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }, children: "ADD" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 207,
              columnNumber: 25
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 190,
            columnNumber: 21
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 188,
          columnNumber: 17
        })
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 126,
      columnNumber: 13
    }
  ) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 120,
    columnNumber: 9
  });
};
export {
  HUD,
  QuestModal
};
