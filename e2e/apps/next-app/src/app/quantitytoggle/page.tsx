import { QuantityToggle } from "../components/QuantityToggle";

export default function QuantityTogglePage() {
  return (
    <div className="sgds-container-sidebar sgds:py-layout-md">
      <h1 className="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">QuantityToggle</h1>
      <div className="sgds:mt-gap-text-md">
        <QuantityToggle />
      </div>
    </div>
  );
}
