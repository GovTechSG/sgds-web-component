import { Appnav } from "../components/Appnav";

export default function AppnavPage() {
  return (
    <div className="sgds-container-sidebar sgds:py-layout-md">
      <h1 className="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Appnav</h1>
      <div className="sgds:mt-gap-text-md">
        <Appnav />
      </div>
    </div>
  );
}
