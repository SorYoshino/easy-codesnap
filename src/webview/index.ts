import { actions, type actionsKey } from "./actions";
import { ContentManager } from "./ContentManager";
import { SessionConfig } from "./SessionConfig";
import { takeSnap } from "./snap";
import { addListeners } from "./ui/listeners";
import { vscode } from "./util";

import "./ui/reactRender";

document.addEventListener("copy", () => takeSnap({ ...SessionConfig.get(), shutterAction: "copy" }));

document.addEventListener("paste", (e) => {
  if (!SessionConfig.get("isLocked")) {
    ContentManager.update(e.clipboardData as DataTransfer);
  }
});

window.addEventListener("message", ({ data: { type, ...config } }) => {
  if (type in actions) {
    actions[type as actionsKey](config);
  } else {
    console.log(`Unknow action on renderer: ${type}`);
  }
});

window.addEventListener(
  "DOMContentLoaded",
  () => {
    addListeners();
    vscode.postMessage({ type: "ready" });
  },
  { once: true },
);
