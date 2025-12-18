import { property } from "lit/decorators.js";
import { Ref, createRef } from "lit/directives/ref.js";
import { computePosition, flip, shift, offset, Placement, Middleware, autoUpdate, Strategy } from "@floating-ui/dom";
import SgdsElement from "./sgds-element";
import generateId from "../utils/generateId";
import { PropertyValueMap } from "lit";

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const ESC = "Escape";

export type DropDirection = "left" | "right" | "up" | "down";

/**
 * @event sgds-show - Emitted event when show instance is called
 * @event sgds-after-show - Emitted event when dropdown has been made visible to the user and CSS transitions have completed
 * @event sgds-hide - Emitted event when hide instance is called
 * @event sgds-after-hide - Emitted event when dropdown has hidden to the user and CSS transitions have completed
 */

export class DropdownElement extends SgdsElement {
  // static styles = SgdsElement.styles;

  /** @internal */
  protected myDropdown: Ref<HTMLElement> = createRef();

  /** @internal Unique id generated for the dropdown menu */
  protected dropdownMenuId: string = generateId("dropdown-menu", "div");

  /** @internal Controls auto-flipping of menu */
  @property({ type: Boolean, state: true })
  protected noFlip = false;

  /** @internal When true, aligns right edge of menu with right edge of button */
  @property({ type: Boolean, reflect: true, state: true })
  protected menuAlignRight = false;

  /** @internal The drop position of menu relative to the toggle button */
  @property({ type: String, reflect: true, state: true })
  protected drop: DropDirection = "down";

  /**  Additional configuration to pass to Floating UI. */
  @property({ type: Object })
  floatingOpts: { placement?: Placement; middleware?: Array<Middleware> } = {};

  /** When true, dropdown menu shows on first load */
  @property({ type: Boolean, reflect: true })
  menuIsOpen = false;

  /** Controls the close behaviour of dropdown menu. By default menu auto-closes when SgdsDropdownItem or area outside dropdown is clicked */
  protected close: "outside" | "default" | "inside" = "default";

  /** Disables the dropdown toggle */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Makes the input readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  private _cleanupAutoUpdate?: () => void;

  /** @internal Reference to the floating menu element */
  protected menuRef: Ref<HTMLElement> = createRef();

  connectedCallback() {
    super.connectedCallback();

    if (this.close !== "inside") {
      document.addEventListener("click", this._handleClickOutOfElement);
    }
    this.addEventListener("keydown", this._handleKeyboardMenuEvent);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._handleClickOutOfElement);
    this.removeEventListener("keydown", this._handleKeyboardMenuEvent);
    if (this._cleanupAutoUpdate) {
      this._cleanupAutoUpdate();
      this._cleanupAutoUpdate = undefined;
    }
  }

  firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);
    // Optionally open menu on first load
    if (this.menuIsOpen) {
      this.updateFloatingPosition();
    }
  }

  /** When invoked, opens the dropdown menu */
  public async showMenu() {
    if (this.disabled || this.menuIsOpen) return;
    this.menuIsOpen = true;
    this.emit("sgds-show");
    await this.updateFloatingPosition();
    this.emit("sgds-after-show");

    if (this.myDropdown.value && this.menuRef.value) {
      this._cleanupAutoUpdate = autoUpdate(this.myDropdown.value, this.menuRef.value, () =>
        this.updateFloatingPosition()
      );
    }
  }

  /** When invoked, hides the dropdown menu */
  public async hideMenu(isOutside?: boolean) {
    if (!this.menuIsOpen) return;
    this.emit("sgds-hide", { detail: { isOutside } });

    this.menuIsOpen = false;
    setTimeout(() => this.emit("sgds-after-hide"), 0);

    if (this._cleanupAutoUpdate) {
      this._cleanupAutoUpdate();
      this._cleanupAutoUpdate = undefined;
    }
  }

  toggleMenu() {
    if (this.menuIsOpen) {
      this.hideMenu();
    } else {
      this.showMenu();
    }
  }

  protected _handleKeyboardMenuEvent = (e: KeyboardEvent) => {
    if (this.readonly) return;
    switch (e.key) {
      case ARROW_DOWN:
      case ARROW_UP:
        e.preventDefault();
        if (!this.menuIsOpen) this.showMenu();
        break;
      case ESC:
        this.hideMenu();
        break;
      default:
        break;
    }
  };

  private _handleClickOutOfElement = (e: MouseEvent) => {
    if (!this.menuIsOpen) return;
    if (!e.composedPath().includes(this)) {
      this.hideMenu(true);
    }
  };

  protected mergeMiddleware(defaults: Middleware[], custom: Middleware[]): Middleware[] {
    const getType = (mw: Middleware) => mw?.name || mw?.constructor?.name;
    const customTypes = custom.map(getType);

    const merged = defaults
      .map(def => {
        const type = getType(def);
        const customIdx = customTypes.indexOf(type);
        return customIdx !== -1 ? custom[customIdx] : def;
      })

      .concat(custom.filter(c => !defaults.some(def => getType(def) === getType(c))));
    return merged;
  }

  protected async updateFloatingPosition() {
    if (!this.myDropdown.value || !this.menuRef.value) return;

    let placement: Placement = "bottom-start";
    switch (this.drop) {
      case "up":
        placement = this.menuAlignRight ? "top-end" : "top-start";
        break;
      case "right":
        placement = "right-start";
        break;
      case "left":
        placement = "left-start";
        break;
      case "down":
        placement = this.menuAlignRight ? "bottom-end" : "bottom-start";
        break;
      default:
        placement = "bottom-start";
        break;
    }

    const defaultMiddleware = [offset(8), !this.noFlip ? flip() : undefined, shift()].filter(Boolean);

    let middleware = defaultMiddleware;
    if (Array.isArray(this.floatingOpts.middleware) && this.floatingOpts.middleware.length > 0) {
      middleware = this.mergeMiddleware(defaultMiddleware, this.floatingOpts.middleware.filter(Boolean));
    }

    const opts = {
      strategy: "fixed" as Strategy,
      placement,
      ...this.floatingOpts,
      middleware
    };

    const {
      x,
      y,
      strategy,
      placement: computedPlacement
    } = await computePosition(this.myDropdown.value, this.menuRef.value, opts);

    this.menuRef.value.setAttribute("data-placement", computedPlacement);

    Object.assign(this.menuRef.value.style, {
      position: strategy,
      left: `${x}px`,
      top: `${y}px`
    });
  }
}
