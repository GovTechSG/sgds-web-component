import { CheckboxGroup } from "../components/CheckboxGroup";

export default function CheckboxGroupPage() {
  return (
    <div className="sgds-container-sidebar sgds:py-layout-md">
      <h1 className="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">CheckboxGroup</h1>
      <div className="sgds:mt-gap-text-md">
        <CheckboxGroup />
      </div>
    </div>
  );
}
