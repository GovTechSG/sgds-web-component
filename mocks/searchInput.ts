import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("mock-search-input")
export class MockSearchInput extends LitElement {
  @state() private options: Array<{ value: string; label: string }> = [];
  @state() private loading = false;

  render() {
    return html`
      <sgds-search-input placeholder="Search..." ?loading=${this.loading} @sgds-input=${this.onInput}
        >${this.options.map(
          opt => html` <sgds-search-input-option value=${opt.value}>${opt.label}</sgds-search-input-option> `
        )}</sgds-search-input
      >
    `;
  }

  private async onInput(e: CustomEvent) {
    const { displayValue } = e.detail;
    // Only fetch if at least 3 characters
    if (!displayValue || displayValue.length < 3) {
      this.options = [];
      this.loading = false;
      return;
    }
    // Prevent race conditions with multiple requests
    this.loading = true;
    const options = await this.fetchOptions(displayValue);
    this.options = options;
    this.loading = false;
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
    return mockData.filter(opt => opt.label.toLowerCase().includes(query.toLowerCase()));
  }
}

// Usage: <mock-search-input></mock-search-input>
