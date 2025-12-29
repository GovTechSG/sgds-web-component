import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

@customElement("mock-async-single-combo-box")
export class MockSearchInput extends LitElement {
  @state() private options: Array<{ value: string; label: string }> = [];
  @state() private loading = false;
  @state() private empty = false;
  private userTypedValue = "";

  render() {
    return html`
      <sgds-combo-box
        required
        hasFeedback
        ?emptyMenuAsync=${this.empty}
        clearable
        placeholder="search"
        async
        @sgds-input=${this.onInput}
        ?loading=${this.loading}
        @sgds-change=${this.onChange}
        >${repeat(
          this.options,
          opt => opt.value,
          opt => html` <sgds-combo-box-option value=${opt.value}>${opt.label}</sgds-combo-box-option> `
        )}</sgds-combo-box
      >
    `;
  }

  private onChange(e: CustomEvent) {
    // Use e.target.value (semicolon-separated string) to determine selected options
    const valueString: string = (e.target as HTMLInputElement).value || "";
    const selectedValues = valueString.split(";").filter(Boolean);
    // Find the corresponding option objects for the selected values
    const selectedOptions = selectedValues.map(val => {
      const found = this.options.find(opt => opt.value === val);
      return { value: val, label: found?.label || val };
    });
    // Persist only selected options
    this.options = selectedOptions;
  }

  private debounceTimer: number | undefined;
  private lastQuery = "";

  private onInput(e: CustomEvent) {
    this.empty = false;
    const { displayValue } = e.detail;
    this.userTypedValue = displayValue;
    this.lastQuery = displayValue;

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(async () => {
      if (!displayValue || displayValue.length < 2) {
        this.loading = false;
        return;
      }
      this.loading = true;
      const options = await this.fetchOptions(displayValue);
      if (options.length === 0) {
        this.empty = true;
      } else this.empty = false;
      // Only update if this is still the latest query
      if (this.lastQuery !== displayValue) return;
      const merged = [...this.options, ...options];
      const deduped = Array.from(new Map(merged.map(opt => [opt.value, opt])).values());
      this.options = deduped;
      this.loading = false;
    }, 1000);
  }

  private async fetchOptions(query: string) {
    // Simulate REST API call with a mock response
    // Replace this with your actual fetch if needed
    await new Promise(r => setTimeout(r, 500)); // Simulate network delay
    // Mock data
    const mockData = [
      { value: "apple", label: "Apple" },
      { value: "apricot", label: "Apricot" },
      { value: "banana", label: "Banana" },
      { value: "blueberry", label: "Blueberry" },
      { value: "blackberry", label: "Blackberry" },
      { value: "cherry", label: "Cherry" },
      { value: "date", label: "Date" },
      { value: "grape", label: "Grape" },
      { value: "kiwi", label: "Kiwi" },
      { value: "lemon", label: "Lemon" },
      { value: "mango", label: "Mango" },
      { value: "orange", label: "Orange" },
      { value: "peach", label: "Peach" },
      { value: "pear", label: "Pear" },
      { value: "plum", label: "Plum" },
      { value: "strawberry", label: "Strawberry" },
      { value: "watermelon", label: "Watermelon" }
    ];
    // Filter mock data by query
    const filteredData = mockData.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
    return filteredData;
  }
}

// Usage: <mock-search-input></mock-search-input>
