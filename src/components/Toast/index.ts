import { SgdsToast } from "./sgds-toast";
import { SgdsToastContainer, ToastPosition } from "./sgds-toast-container";
import { register } from "../../utils/ce-registry";

register("sgds-toast", SgdsToast);
register("sgds-toast-container", SgdsToastContainer);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-toast-container": SgdsToastContainer;
    "sgds-toast": SgdsToast;
  }
}

export interface ToastOptions {
  title: string;
  message?: string;
  variant?: "success" | "warning" | "danger" | "info";
  position?: ToastPosition;
  autohide?: boolean;
  delay?: number;
  dismissible?: boolean;
}

const containers = new Map<string, SgdsToastContainer>();

export function toast(options: ToastOptions) {
  const position = options.position || "bottom-end";
  let container = containers.get(position);
  if (!container || !container.isConnected) {
    container = document.createElement("sgds-toast-container") as SgdsToastContainer;
    container.position = position;
    document.body.appendChild(container);
    containers.set(position, container);
  }
  return container.toast(options);
}
