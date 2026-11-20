import { Breadcrumb } from "../components/Breadcrumb";

export default function BreadcrumbPage() {
  return (
    <div className="sgds-container-sidebar sgds:py-layout-md">
      <h1 className="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Breadcrumb</h1>
      <div className="sgds:mt-gap-text-md">
        <Breadcrumb />
      </div>
    </div>
  );
}
