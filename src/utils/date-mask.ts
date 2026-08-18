/**
 * Lightweight date input mask replacing imask.
 * Handles digit-only input with placeholder display for date formats.
 */

type MaskEventType = "accept" | "complete";
type MaskEventHandler = () => void;

export class DateMask {
  private input: HTMLInputElement;
  private placeholderStr: string;
  private _state: string; // tracks the current masked value
  private listeners: Map<MaskEventType, MaskEventHandler[]> = new Map();
  private _boundHandleBeforeInput: (e: InputEvent) => void;
  private _boundHandleInput: (e: InputEvent) => void;
  private _boundHandleKeydown: (e: KeyboardEvent) => void;
  private _boundHandleFocus: () => void;
  private _boundHandleBlur: () => void;
  private _valueAtFocus: string;

  public masked: { value: string; isComplete: boolean };

  constructor(input: HTMLInputElement, options: DateMaskOptions) {
    this.input = input;
    this.placeholderStr = this._buildPlaceholder(options.pattern);
    this._state = this.placeholderStr;
    this.listeners.set("accept", []);
    this.listeners.set("complete", []);

    const masked = { value: "", isComplete: false };
    Object.defineProperties(masked, {
      value: { get: () => this._state, enumerable: true },
      isComplete: { get: () => this._state.length > 0 && !/[DMY]/.test(this._state), enumerable: true }
    });
    this.masked = masked;

    // If input already has a value that looks like a filled date, use it
    if (this.input.value && this.input.value.length === this._state.length && !/[DMY]/.test(this.input.value)) {
      this._state = this.input.value;
    } else {
      this.input.value = this._state;
    }

    this._boundHandleBeforeInput = this._handleBeforeInput.bind(this);
    this._boundHandleInput = this._handleInput.bind(this);
    this._boundHandleKeydown = this._handleKeydown.bind(this);
    this._boundHandleFocus = this._handleFocus.bind(this);
    this._boundHandleBlur = this._handleBlur.bind(this);
    this._valueAtFocus = this._state;

    this.input.addEventListener("beforeinput", this._boundHandleBeforeInput);
    this.input.addEventListener("input", this._boundHandleInput);
    this.input.addEventListener("keydown", this._boundHandleKeydown);
    this.input.addEventListener("focus", this._boundHandleFocus);
    this.input.addEventListener("blur", this._boundHandleBlur);
  }

  get value(): string {
    return this._state;
  }

  set value(val: string) {
    if (!val || val === "") {
      this._state = this.placeholderStr;
    } else {
      this._state = val;
    }
    this.input.value = this._state;
    this._emit("accept");
  }

  on(event: MaskEventType, handler: MaskEventHandler): void {
    this.listeners.get(event)?.push(handler);
  }

  updateValue(): void {
    // Sync state from input (used when value set externally on input)
    this._state = this.input.value;
  }

  destroy(): void {
    this.input.removeEventListener("beforeinput", this._boundHandleBeforeInput);
    this.input.removeEventListener("input", this._boundHandleInput);
    this.input.removeEventListener("keydown", this._boundHandleKeydown);
    this.input.removeEventListener("focus", this._boundHandleFocus);
    this.input.removeEventListener("blur", this._boundHandleBlur);
    this.listeners.clear();
  }

  private _handleFocus(): void {
    this._valueAtFocus = this._state;
  }

  private _handleBlur(): void {
    // Dispatch native change event if value changed during this focus session
    if (this._state !== this._valueAtFocus) {
      this.input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  private _buildPlaceholder(pattern: string): string {
    return pattern
      .replace(/`/g, "")
      .replace(/\{(\/)\}/g, "$1")
      .replace(/d/g, "D")
      .replace(/m/g, "M")
      .replace(/y/g, "Y");
  }

  private _getDigitPositions(): number[] {
    const positions: number[] = [];
    for (let i = 0; i < this.placeholderStr.length; i++) {
      const ch = this.placeholderStr[i];
      if (ch === "D" || ch === "M" || ch === "Y") {
        positions.push(i);
      }
    }
    return positions;
  }

  private _handleBeforeInput(e: InputEvent): void {
    // Prevent browser's default text handling — we handle everything in keydown
    e.preventDefault();
  }

  private _handleInput(): void {
    // If browser still modified the value (some edge cases), restore our state
    if (this.input.value !== this._state) {
      this.input.value = this._state;
    }
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (e.key === "Backspace") {
      e.preventDefault();
      this._backspace();
    } else if (e.key === "Delete") {
      e.preventDefault();
      this._deleteForward();
    } else if (e.key.length === 1 && /\d/.test(e.key)) {
      e.preventDefault();
      this._insertDigit(e.key);
    }
    // Arrow keys: let browser handle cursor movement naturally
  }

  private _insertDigit(digit: string): void {
    const digitPositions = this._getDigitPositions();
    const currentVal = this._state.split("");

    // Find the first unfilled placeholder position
    let insertPos = -1;
    for (const pos of digitPositions) {
      if (/[DMY]/.test(currentVal[pos])) {
        insertPos = pos;
        break;
      }
    }

    if (insertPos === -1) {
      // All filled — no room
      return;
    }

    currentVal[insertPos] = digit;
    this._state = currentVal.join("");
    this.input.value = this._state;

    // Move cursor after the inserted digit
    const nextPos = this._findNextInputPos(insertPos);
    this.input.setSelectionRange(nextPos, nextPos);

    this._emit("accept");

    if (this.masked.isComplete) {
      this._emit("complete");
    }
  }

  private _backspace(): void {
    const pos = this.input.selectionStart ?? this._state.length;
    const val = this._state.split("");

    // Find previous digit position from cursor
    let targetPos = pos - 1;
    while (targetPos >= 0 && !/\d/.test(val[targetPos])) {
      targetPos--;
    }

    if (targetPos >= 0) {
      val[targetPos] = this.placeholderStr[targetPos];
      this._state = val.join("");
      this.input.value = this._state;
      this.input.setSelectionRange(targetPos, targetPos);
      this._emit("accept");
    }
  }

  private _deleteForward(): void {
    const pos = this.input.selectionStart ?? 0;
    const val = this._state.split("");

    let targetPos = pos;
    while (targetPos < val.length && !/\d/.test(val[targetPos])) {
      targetPos++;
    }

    if (targetPos < val.length) {
      val[targetPos] = this.placeholderStr[targetPos];
      this._state = val.join("");
      this.input.value = this._state;
      this.input.setSelectionRange(pos, pos);
      this._emit("accept");
    }
  }

  private _findNextInputPos(pos: number): number {
    for (let i = pos + 1; i < this._state.length; i++) {
      if (/[DMY]/.test(this._state[i])) {
        return i;
      }
    }
    // If no more placeholders, place cursor at end
    return this._state.length;
  }

  private _emit(event: MaskEventType): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      for (const handler of handlers) {
        handler();
      }
    }
  }
}

export interface DateMaskOptions {
  pattern: string;
}
