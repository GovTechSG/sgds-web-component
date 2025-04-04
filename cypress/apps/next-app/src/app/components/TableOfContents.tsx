import SgdsTableOfContents from "@govtechsg/sgds-web-component/react/table-of-contents/index.js";
import SgdsLink from "@govtechsg/sgds-web-component/react/link/index.js";

export const TableOfContents = () => {
  return (
    <>
      <SgdsTableOfContents>
        <h2>Header</h2>
        <li slot="contents">
          <SgdsLink>
            <a href="#">Link</a>
          </SgdsLink>
        </li>
        <li slot="contents">
          <SgdsLink>
            <a href="#">Link</a>
          </SgdsLink>
        </li>
        <li slot="contents">
          <SgdsLink>
            <a href="#">Link</a>
          </SgdsLink>
        </li>
        <li slot="contents">
          <SgdsLink>
            <a href="#">Link</a>
          </SgdsLink>
        </li>
      </SgdsTableOfContents>
    </>
  );
};
