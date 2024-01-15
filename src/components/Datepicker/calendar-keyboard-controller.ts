import { ReactiveControllerHost, ReactiveController } from "lit";

export class CalendarKeyboardController implements ReactiveController {
  private host: ReactiveControllerHost;
  pos = { x: 0, y: 0 };

  _onMouseMove = ({ clientX, clientY }: MouseEvent) => {
    this.pos = { x: clientX, y: clientY };
    this.host.requestUpdate();
  };

  private _handleKeyPress(event) {
    switch (event.key) {
      case "ArrowUp":
        selectedDate.setDate(selectedDate.getDate() - 7);
        break;
      case "ArrowDown":
        selectedDate.setDate(selectedDate.getDate() + 7);
        break;
      case "ArrowLeft":
        selectedDate.setDate(selectedDate.getDate() - 1);
        break;
      case "ArrowRight":
        selectedDate.setDate(selectedDate.getDate() + 1);
        break;
      default:
        return;
    }
  }
  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    window.addEventListener("mousemove", this._onMouseMove);
  }

  hostDisconnected() {
    window.removeEventListener("mousemove", this._onMouseMove);
  }
}
