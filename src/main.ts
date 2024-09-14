import { Button } from "./button/button";
import { Dialog } from "./dialog/dialog";
import "../src/style.css";

export const HpDialog = new Dialog("#modal", {});

// export const HpButton = new Button({
//   text: "Open Dialog",
//   style: {
//     padding: "10px 15px",
//     fontSize: "18px",
//     borderRadius: "4px",
//     border: "0",
//     outline: "none",
//     cursor: "pointer",
//     background: "#6a6ac9",
//   },
//   onClick: () => {
//     HpDialog.show({
//       title: "Dialog Title",
//       content: "This is a dialog content",
//     });
//   },
// });
