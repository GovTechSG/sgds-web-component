import { TableOfContents } from "../components/TableOfContents";

export default function TableOfContentsPage() {
  return (
    <div className="sgds-container-sidebar sgds:py-layout-md">
      <h1 className="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">TableOfContents</h1>
      <div className="sgds:mt-gap-text-md">
        <TableOfContents />
      </div>
    </div>
  );
}
