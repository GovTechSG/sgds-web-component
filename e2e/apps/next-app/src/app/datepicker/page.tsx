import { Datepicker } from "../components/Datepicker";

export default function DatepickerPage() {
  return (
    <div className="sgds-container-sidebar sgds:py-layout-md">
      <h1 className="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Datepicker</h1>
      <div className="sgds:mt-gap-text-md">
        <Datepicker />
      </div>
    </div>
  );
}
