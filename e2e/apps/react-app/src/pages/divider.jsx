import { Divider } from "../components/Divider";

export default function DividerPage() {
  return (
    <div className="sgds-container-sidebar sgds:py-layout-md">
      <h1 className="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Divider</h1>
      <div className="sgds:mt-gap-text-md">
        <Divider />
      </div>
    </div>
  );
}
