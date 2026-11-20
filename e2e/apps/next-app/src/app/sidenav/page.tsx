import { Sidenav } from "../components/Sidenav";

export default function SidenavPage() {
  return (
    <div className="sgds-container-sidebar sgds:py-layout-md">
      <h1 className="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Sidenav</h1>
      <div className="sgds:mt-gap-text-md">
        <Sidenav />
      </div>
    </div>
  );
}
