import { SgdsPagination } from "../src/components/Pagination/sgds-pagination";
import { fixture, assert, expect, elementUpdated } from "@open-wc/testing";
import { html } from "lit";

customElements.define("sgds-pagination", SgdsPagination);
it("is defined", () => {
  const el = document.createElement("sgds-pagination");
  assert.instanceOf(el, SgdsPagination);
});

it("renders 1 page numbers as dataLength = 1", async () => {
  const el = await fixture(html` <sgds-pagination dataLength="1"></sgds-pagination> `);
  const pageOne = el.shadowRoot?.querySelectorAll("li")[1];
  const pageNull = el.shadowRoot?.querySelectorAll("li")[2];
  await elementUpdated(el);
  expect(pageOne?.textContent).to.contain("1");
  expect(pageNull?.textContent).to.not.contain("2");
});

it("renders 3 page numbers as dataLength = 20", async () => {
  const el = await fixture(html` <sgds-pagination dataLength="20" limit="3"></sgds-pagination> `);
  const pageOne = el.shadowRoot?.querySelectorAll("li")[1];
  const pageTwo = el.shadowRoot?.querySelectorAll("li")[2];
  const pageThree = el.shadowRoot?.querySelectorAll("li")[3];
  const pageNull = el.shadowRoot?.querySelectorAll("li")[4];
  await elementUpdated(el);
  expect(pageOne?.textContent).to.contain("1");
  expect(pageTwo?.textContent).to.contain("2");
  expect(pageThree?.textContent).to.contain("3");
  expect(pageNull?.textContent).to.not.contain("4");
});

it("limit >= pages.length, all page number should show and remain fix throughout navigation", async () => {
  const el = await fixture(
    html` <sgds-pagination dataLength="3" limit="4" itemsPerPage="1" currentPage="1"></sgds-pagination> `
  );
  const pageOne = el.shadowRoot?.querySelectorAll("li")[1];
  const pageTwo = el.shadowRoot?.querySelectorAll("li")[2];
  const pageThree = el.shadowRoot?.querySelectorAll("li")[3];
  const pageNull = el.shadowRoot?.querySelectorAll("li")[4];

  expect(pageOne?.textContent).to.contain("1");
  expect(pageTwo?.textContent).to.contain("2");
  expect(pageThree?.textContent).to.contain("3");
  expect(pageNull?.textContent).to.not.contain("4");
  expect(pageNull?.textContent).to.not.contain("…");

  const el2 = await fixture(
    html` <sgds-pagination dataLength="3" limit="4" itemsPerPage="1" currentPage="2"></sgds-pagination> `
  );
  const pageOneEl2 = el2.shadowRoot?.querySelectorAll("li")[1];
  const pageTwoEl2 = el2.shadowRoot?.querySelectorAll("li")[2];
  const pageThreeEl2 = el2.shadowRoot?.querySelectorAll("li")[3];
  const pageNullEl2 = el2.shadowRoot?.querySelectorAll("li")[4];

  expect(pageOneEl2?.textContent).to.contain("1");
  expect(pageTwoEl2?.textContent).to.contain("2");
  expect(pageThreeEl2?.textContent).to.contain("3");
  expect(pageNullEl2?.textContent).to.not.contain("4");
  expect(pageNullEl2?.textContent).to.not.contain("…");

  const el3 = await fixture(
    html` <sgds-pagination dataLength="3" limit="4" itemsPerPage="1" currentPage="3"></sgds-pagination> `
  );
  const pageOneEl3 = el3.shadowRoot?.querySelectorAll("li")[1];
  const pageTwoEl3 = el3.shadowRoot?.querySelectorAll("li")[2];
  const pageThreeEl3 = el3.shadowRoot?.querySelectorAll("li")[3];
  const pageNullEl3 = el3.shadowRoot?.querySelectorAll("li")[4];

  expect(pageOneEl3?.textContent).to.contain("1");
  expect(pageTwoEl3?.textContent).to.contain("2");
  expect(pageThreeEl3?.textContent).to.contain("3");
  expect(pageNullEl3?.textContent).to.not.contain("4");
  expect(pageNullEl3?.textContent).to.not.contain("…");
});

it("when limit(even) < page.length, page number shows should be same count as limit throughout navigation", async () => {
  const el = await fixture(
    html` <sgds-pagination dataLength="5" limit="4" itemsPerPage="1" currentPage="1" ellipsisOn></sgds-pagination> `
  );

  const pageOne = el.shadowRoot?.querySelectorAll("li")[1];
  const pageTwo = el.shadowRoot?.querySelectorAll("li")[2];
  const pageThree = el.shadowRoot?.querySelectorAll("li")[3];
  const pageFour = el.shadowRoot?.querySelectorAll("li")[4];
  const pageEllipsisSpan = el.shadowRoot?.querySelectorAll("li")[5]?.querySelector("span[aria-hidden='true']");

  expect(pageOne?.textContent).to.contain("1");
  expect(pageTwo?.textContent).to.contain("2");
  expect(pageThree?.textContent).to.contain("3");
  expect(pageFour?.textContent).to.contain("4");
  expect(pageEllipsisSpan?.textContent).to.contain("…");

  const el2 = await fixture(
    html` <sgds-pagination dataLength="5" limit="4" itemsPerPage="1" currentPage="2" ellipsisOn></sgds-pagination> `
  );

  const pageOneEl2 = el2.shadowRoot?.querySelectorAll("li")[1];
  const pageTwoEl2 = el2.shadowRoot?.querySelectorAll("li")[2];
  const pageThreeEl2 = el2.shadowRoot?.querySelectorAll("li")[3];
  const pageFourEl2 = el2.shadowRoot?.querySelectorAll("li")[4];
  const pageEllipsisSpanEl2 = el2.shadowRoot?.querySelectorAll("li")[5]?.querySelector("span[aria-hidden='true']");

  expect(pageOneEl2?.textContent).to.contain("1");
  expect(pageTwoEl2?.textContent).to.contain("2");
  expect(pageThreeEl2?.textContent).to.contain("3");
  expect(pageFourEl2?.textContent).to.contain("4");
  expect(pageEllipsisSpanEl2?.textContent).to.contain("…");

  const el3 = await fixture(
    html` <sgds-pagination dataLength="5" limit="4" itemsPerPage="1" currentPage="3" ellipsisOn></sgds-pagination> `
  );

  const pageOneEl3 = el3.shadowRoot?.querySelectorAll("li")[1];
  const pageTwoEl3 = el3.shadowRoot?.querySelectorAll("li")[2];
  const pageThreeEl3 = el3.shadowRoot?.querySelectorAll("li")[3];
  const pageFourEl3 = el3.shadowRoot?.querySelectorAll("li")[4];
  const pageEllipsisSpanEl3 = el3.shadowRoot?.querySelectorAll("li")[5]?.querySelector("span[aria-hidden='true']");

  expect(pageOneEl3?.textContent).to.contain("1");
  expect(pageTwoEl3?.textContent).to.contain("2");
  expect(pageThreeEl3?.textContent).to.contain("3");
  expect(pageFourEl3?.textContent).to.contain("4");
  expect(pageEllipsisSpanEl3?.textContent).to.contain("…");

  const el4 = await fixture(
    html` <sgds-pagination dataLength="5" limit="4" itemsPerPage="1" currentPage="4" ellipsisOn></sgds-pagination> `
  );

  const pageEllipsisSpanEl4 = el4.shadowRoot?.querySelectorAll("li")[1]?.querySelector("span[aria-hidden='true']");
  const pageTwoEl4 = el4.shadowRoot?.querySelectorAll("li")[2];
  const pageThreeEl4 = el4.shadowRoot?.querySelectorAll("li")[3];
  const pageFourEl4 = el4.shadowRoot?.querySelectorAll("li")[4];
  const pageFiveEl4 = el4.shadowRoot?.querySelectorAll("li")[5];

  expect(pageEllipsisSpanEl4?.textContent).to.contain("…");
  expect(pageTwoEl4?.textContent).to.contain("2");
  expect(pageThreeEl4?.textContent).to.contain("3");
  expect(pageFourEl4?.textContent).to.contain("4");
  expect(pageFiveEl4?.textContent).to.contain("5");

  const el5 = await fixture(
    html` <sgds-pagination dataLength="5" limit="4" itemsPerPage="1" currentPage="4" ellipsisOn></sgds-pagination> `
  );

  const pageEllipsisSpanEl5 = el5.shadowRoot?.querySelectorAll("li")[1]?.querySelector("span[aria-hidden='true']");
  const pageTwoEl5 = el5.shadowRoot?.querySelectorAll("li")[2];
  const pageThreeEl5 = el5.shadowRoot?.querySelectorAll("li")[3];
  const pageFourEl5 = el5.shadowRoot?.querySelectorAll("li")[4];
  const pageFiveEl5 = el5.shadowRoot?.querySelectorAll("li")[5];

  expect(pageEllipsisSpanEl5?.textContent).to.contain("…");
  expect(pageTwoEl5?.textContent).to.contain("2");
  expect(pageThreeEl5?.textContent).to.contain("3");
  expect(pageFourEl5?.textContent).to.contain("4");
  expect(pageFiveEl5?.textContent).to.contain("5");
});

it("when limit(odd) < page.length, page number shows should be same count as limit throughout navigation", async () => {
  const el = await fixture(
    html` <sgds-pagination dataLength="5" limit="3" itemsPerPage="1" currentPage="1" ellipsisOn></sgds-pagination> `
  );
  const pageOne = el.shadowRoot?.querySelectorAll("li")[1];
  const pageTwo = el.shadowRoot?.querySelectorAll("li")[2];
  const pageThree = el.shadowRoot?.querySelectorAll("li")[3];
  const pageEllipsis = el.shadowRoot?.querySelectorAll("li")[4]?.querySelector("span[aria-hidden='true']");

  expect(pageOne?.textContent).to.contain("1");
  expect(pageTwo?.textContent).to.contain("2");
  expect(pageThree?.textContent).to.contain("3");
  expect(pageEllipsis?.textContent).to.contain("…");

  const el2 = await fixture(
    html` <sgds-pagination dataLength="5" limit="3" itemsPerPage="1" currentPage="2" ellipsisOn></sgds-pagination> `
  );

  const pageOneEl2 = el2.shadowRoot?.querySelectorAll("li")[1];
  const pageTwoEl2 = el2.shadowRoot?.querySelectorAll("li")[2];
  const pageThreeEl2 = el2.shadowRoot?.querySelectorAll("li")[3];
  const pageEllipsisEl2 = el2.shadowRoot?.querySelectorAll("li")[4]?.querySelector("span[aria-hidden='true']");

  expect(pageOneEl2?.textContent).to.contain("1");
  expect(pageTwoEl2?.textContent).to.contain("2");
  expect(pageThreeEl2?.textContent).to.contain("3");
  expect(pageEllipsisEl2?.textContent).to.contain("…");

  const el3 = await fixture(
    html` <sgds-pagination dataLength="5" limit="3" itemsPerPage="1" currentPage="3" ellipsisOn></sgds-pagination> `
  );

  const pagePrevEllipsisEl3 = el3.shadowRoot?.querySelectorAll("li")[1]?.querySelector("span[aria-hidden='true']");
  const pageTwoEl3 = el3.shadowRoot?.querySelectorAll("li")[2];
  const pageThreeEl3 = el3.shadowRoot?.querySelectorAll("li")[3];
  const pageFourEl3 = el3.shadowRoot?.querySelectorAll("li")[4];
  const pageNextEllipsisEl3 = el3.shadowRoot?.querySelectorAll("li")[5]?.querySelector("span[aria-hidden='true']");
  3;
  expect(pagePrevEllipsisEl3?.textContent).to.contain("…");
  expect(pageTwoEl3?.textContent).to.contain("2");
  expect(pageThreeEl3?.textContent).to.contain("3");
  expect(pageFourEl3?.textContent).to.contain("4");
  expect(pageNextEllipsisEl3?.textContent).to.contain("…");

  const el4 = await fixture(
    html` <sgds-pagination dataLength="5" limit="4" itemsPerPage="1" currentPage="4" ellipsisOn></sgds-pagination> `
  );

  const pagePrevEllipsisEl4 = el4.shadowRoot?.querySelectorAll("li")[1]?.querySelector("span[aria-hidden='true']");
  const pageTwoEl4 = el4.shadowRoot?.querySelectorAll("li")[2];
  const pageThreeEl4 = el4.shadowRoot?.querySelectorAll("li")[3];
  const pageFourEl4 = el4.shadowRoot?.querySelectorAll("li")[4];
  const pageFiveEl4 = el4.shadowRoot?.querySelectorAll("li")[5];

  expect(pagePrevEllipsisEl4?.textContent).to.contain("…");
  expect(pageTwoEl4?.textContent).to.contain("2");
  expect(pageThreeEl4?.textContent).to.contain("3");
  expect(pageFourEl4?.textContent).to.contain("4");
  expect(pageFiveEl4?.textContent).to.contain("5");
});

// it("onclick page should add the active class to li", async () => {
//   const el = await fixture(
//     html` <sgds-pagination limit="3" itemsPerPage="1" dataLength="20" currentPage="1"></sgds-pagination> `
//   ) as SgdsPagination;

//   const pageOne = el.shadowRoot?.querySelectorAll("li>span")[1] as HTMLElement;
//   const pageTwo = el.shadowRoot?.querySelectorAll("li>span")[2] as HTMLElement;

//   expect(pageOne?.classList.contains("active")).to.be.true;

//   pageTwo?.click();
//   await el.updateComplete

//   expect(pageOne?.classList.contains("active")).to.be.false;
//   expect(pageTwo?.classList.contains("active")).to.be.true;
// });

it("when no data pass in pagination has no ellipsis", async () => {
  const el = await fixture(
    html`
      <sgds-pagination
        directionVariant="text"
        dataLength="0"
        limit="3"
        itemsPerPage="1"
        currentPage="1"
        ellipsisOn
      ></sgds-pagination>
    `
  );
  const prevButton = el.shadowRoot?.querySelectorAll("li")[0];
  const nextButton = el.shadowRoot?.querySelectorAll("li")[1];

  expect(prevButton?.textContent).to.contain("Previous");
  expect(nextButton?.textContent).to.contain("Next");
});

it("last ellipsis should appear when page > 3", async () => {
  // // 20 / 5 = 4 page
  const el = await fixture(
    html` <sgds-pagination dataLength="20" limit="3" itemsPerPage="5" currentPage="1"></sgds-pagination> `
  );

  const pageOne = el.shadowRoot?.querySelectorAll("li")[1];
  const pageTwo = el.shadowRoot?.querySelectorAll("li")[2];
  const pageThree = el.shadowRoot?.querySelectorAll("li")[3];
  const pageNextEllipsis = el.shadowRoot?.querySelectorAll("li")[4]?.querySelector("span[aria-hidden='true']");

  expect(pageOne?.textContent).to.contain("1");
  expect(pageTwo?.textContent).to.contain("2");
  expect(pageThree?.textContent).to.contain("3");
  expect(pageNextEllipsis?.textContent).to.contain("…");
});

it("last ellipsis should not appear when page < 3", async () => {
  // 15 / 5 = 3 page
  const el = (await fixture(
    html` <sgds-pagination dataLength="15" limit="3" itemsPerPage="5" currentPage="1"></sgds-pagination> `
  )) as SgdsPagination;

  const pageOne = el.shadowRoot?.querySelectorAll("li")[1];
  const pageTwo = el.shadowRoot?.querySelectorAll("li")[2];
  const pageThree = el.shadowRoot?.querySelectorAll("li")[3];
  const pageNextEllipsis = el.shadowRoot?.querySelectorAll("li")[4]?.querySelector("span[aria-hidden='true']");

  expect(pageOne?.textContent).to.contain("1");
  expect(pageTwo?.textContent).to.contain("2");
  expect(pageThree?.textContent).to.contain("3");
  expect(pageNextEllipsis).to.not.exist;

  // 10 / 5 = 2 page
  el.dataLength = 10;
  await elementUpdated(el);

  const pageNextEllipsis2 = el.shadowRoot?.querySelectorAll("li")[3]?.querySelector("span[aria-hidden='true']");

  expect(pageNextEllipsis2).to.not.exist;
  // 5 / 5 = 1 page

  el.dataLength = 5;
  await elementUpdated(el);

  const pageNextEllipsis1 = el.shadowRoot?.querySelectorAll("li")[2]?.querySelector("span[aria-hidden='true']");

  expect(pageNextEllipsis1).to.not.exist;
});

it("renders first ellipsis when ellipsisOn = true", async () => {
  // no first ellipsis
  const el = (await fixture(
    html` <sgds-pagination dataLength="50" limit="3" itemsPerPage="5" currentPage="1" ellipsisOn></sgds-pagination> `
  )) as SgdsPagination;

  const pagePrevEllipsis = el.shadowRoot?.querySelectorAll("li")[1]?.querySelector("span[aria-hidden='true']");
  expect(pagePrevEllipsis).to.not.exist;

  //when currentpage is 5 which is above limit, both ellipsis side should show
  const el2 = (await fixture(
    html` <sgds-pagination dataLength="50" limit="3" itemsPerPage="5" currentPage="5" ellipsisOn></sgds-pagination> `
  )) as SgdsPagination;

  const pagePrevEllipsisEl2 = el2.shadowRoot?.querySelectorAll("li")[1]?.querySelector("span[aria-hidden='true']");
  const pageNextEllipsisEl2 = el2.shadowRoot?.querySelectorAll("li")[5]?.querySelector("span[aria-hidden='true']");
  expect(pagePrevEllipsisEl2).to.exist;
  expect(pageNextEllipsisEl2).to.exist;

  // when currentpage is 9 and at last page , the last ellipsis should disappear
  const el3 = (await fixture(
    html` <sgds-pagination dataLength="50" limit="3" itemsPerPage="5" currentPage="9" ellipsisOn></sgds-pagination> `
  )) as SgdsPagination;

  const pagePrevEllipsisEl3 = el3.shadowRoot?.querySelectorAll("li")[1]?.querySelector("span[aria-hidden='true']");
  const pageNextEllipsisEl3 = el3.shadowRoot?.querySelectorAll("li")[5]?.querySelector("span[aria-hidden='true']");
  expect(pagePrevEllipsisEl3).to.exist;
  expect(pageNextEllipsisEl3).to.not.exist;

  // el.currentPage = 10;
  const el4 = (await fixture(
    html` <sgds-pagination dataLength="50" limit="3" itemsPerPage="5" currentPage="10" ellipsisOn></sgds-pagination> `
  )) as SgdsPagination;

  const pagePrevEllipsisEl4 = el4.shadowRoot?.querySelectorAll("li")[1]?.querySelector("span[aria-hidden='true']");
  const pageNextEllipsisEl4 = el4.shadowRoot?.querySelectorAll("li")[5]?.querySelector("span[aria-hidden='true']");
  expect(pagePrevEllipsisEl4).to.exist;
  expect(pageNextEllipsisEl4).to.not.exist;
});
