import { assert, fixture, expect } from "@open-wc/testing";
import { html } from "lit";
import { SgdsIconButton, SgdsPagination } from "../src/components";
import sinon from "sinon";
import { sendKeys } from "@web/test-runner-commands";
import "./sgds-web-component";

describe("variant=default sgds-pagination", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-pagination");
    assert.instanceOf(el, SgdsPagination);
  });

  it("can be semantically compared with shadowDom trees for just 1 page", async () => {
    const el = await fixture(html` <sgds-pagination dataLength="1"></sgds-pagination>`);
    assert.shadowDom.equal(
      el,
      `
      <nav aria-label="pagination" role="navigation">
      <ul class="pagination pagination-md">
      <sgds-icon-button ariaLabel="Previous" variant="ghost" tone="brand" size="md" disabled="" name="arrow-left" target="_self"></sgds-icon-button>
      <li key="1" class="page-item active">
          <span class="page-link"  role="button" aria-current="true" aria-label="Current Page, Page 1" tabindex="0">1</span>
        </li>
      <sgds-icon-button ariaLabel="Next" variant="ghost" tone="brand" size="md" disabled="" name="arrow-right" target="_self"></sgds-icon-button>
      </ul>
      </nav>
      `
    );
  });
  it("can be semantically compared with shadowDom trees for 2 pages", async () => {
    const el = await fixture(html` <sgds-pagination dataLength="10" itemsPerPage="5"></sgds-pagination>`);
    assert.shadowDom.equal(
      el,
      `
      <nav aria-label="pagination" role="navigation">
      <ul class="pagination pagination-md">
      <sgds-icon-button ariaLabel="Previous" variant="ghost" tone="brand" size="md" disabled="" name="arrow-left" target="_self"></sgds-icon-button>
      <li key="1" class="page-item active">
          <span class="page-link" tabindex="0" aria-current="true" aria-label="Current Page, Page 1" role="button">1</span>
        </li>
      <li key="2" class="page-item">
          <span class="page-link" tabindex="0" aria-current="false" aria-label="Go to Page 2" role="button">2</span>
        </li>
      <sgds-icon-button ariaLabel="Next" variant="ghost" tone="brand" size="md" name="arrow-right" target="_self"></sgds-icon-button>
      </ul>
      </nav>
      `
    );
  });
  it("can be semantically compared with shadowDom trees when currentPage=2 for 2 pages", async () => {
    const el = await fixture(
      html` <sgds-pagination dataLength="10" itemsPerPage="5" currentPage="2"></sgds-pagination>`
    );
    assert.shadowDom.equal(
      el,
      `
      <nav aria-label="pagination" role="navigation">
      <ul class="pagination pagination-md">
      <sgds-icon-button ariaLabel="Previous" variant="ghost" tone="brand" size="md"  name="arrow-left" target="_self"></sgds-icon-button>
      <li key="1" class="page-item">
          <span class="page-link" tabindex="0" aria-current="false" aria-label="Go to Page 1" role="button">1</span>
        </li>
      <li key="2" class="page-item active">
          <span class="page-link" tabindex="0" aria-current="true" aria-label="Current Page, Page 2" role="button">2</span>
        </li>
      <sgds-icon-button ariaLabel="Next" variant="ghost" tone="brand" size="md" disabled="" name="arrow-right" target="_self"></sgds-icon-button>
      </ul>
      </nav>
      `
    );
  });
  const pagesLengthsOneToSeven = [
    { dataLength: 20, itemsPerPage: 20, expectedEllipsis: 0, expectedPages: 1 }, // 1 page
    { dataLength: 20, itemsPerPage: 10, expectedEllipsis: 0, expectedPages: 2 }, //2 pages
    { dataLength: 20, itemsPerPage: 8, expectedEllipsis: 0, expectedPages: 3 }, //3 pages
    { dataLength: 20, itemsPerPage: 5, expectedEllipsis: 0, expectedPages: 4 }, //4 pages
    { dataLength: 20, itemsPerPage: 4, expectedEllipsis: 0, expectedPages: 5 }, //5 pages
    { dataLength: 18, itemsPerPage: 3, expectedEllipsis: 0, expectedPages: 6 }, //6 pages
    { dataLength: 20, itemsPerPage: 3, expectedEllipsis: 0, expectedPages: 7 } //7 pages
  ];
  pagesLengthsOneToSeven.map(p => {
    it(`when total page length is ${p}, ${p} page(s) appear with no ellipsis`, async () => {
      const el = await fixture(
        html`<sgds-pagination dataLength=${p.dataLength} itemsPerPage=${p.itemsPerPage}></sgds-pagination>`
      );

      const totalNumberOfPageLinks = el.shadowRoot?.querySelectorAll("span.page-link:not(.ellipsis)");
      expect(totalNumberOfPageLinks?.length).to.equal(p.expectedPages);

      const totalNumberOfEllipsis = el.shadowRoot?.querySelectorAll(".page-link.ellipsis");
      expect(totalNumberOfEllipsis?.length).to.equal(p.expectedEllipsis);
    });
  });
  const pagesAboveSeven = [
    {
      dataLength: 16,
      itemsPerPage: 2,
      expectedPages: 6,
      expectedEllipsis: 1,
      expectedFirstPage: 1,
      expectedLastPage: 8
    }, //8 pages
    {
      dataLength: 18,
      itemsPerPage: 2,
      expectedPages: 6,
      expectedEllipsis: 1,
      expectedFirstPage: 1,
      expectedLastPage: 9
    }, //9 pages
    {
      dataLength: 20,
      itemsPerPage: 2,
      expectedPages: 6,
      expectedEllipsis: 1,
      expectedFirstPage: 1,
      expectedLastPage: 10
    } //10 pages
  ];
  pagesAboveSeven.map(p => {
    it(`when total page length is ${p}, ${p} page(s) appear with 1 ellipsis, when currentPage is default`, async () => {
      const el = await fixture(
        html`<sgds-pagination dataLength=${p.dataLength} itemsPerPage=${p.itemsPerPage}></sgds-pagination>`
      );

      const pageLinks = el.shadowRoot?.querySelectorAll("span.page-link:not(.ellipsis)");
      expect(pageLinks?.length).to.equal(p.expectedPages);

      const ellipsises = el.shadowRoot?.querySelectorAll(".page-link.ellipsis");
      expect(ellipsises?.length).to.equal(p.expectedEllipsis);

      // 1st page is always visible
      const firstPageNumber = pageLinks?.[0];
      expect(firstPageNumber?.textContent?.trim()).to.equal(p.expectedFirstPage.toString());
      // last page is always visible
      const lastPageNumber = pageLinks?.[pageLinks.length - 1];
      expect(lastPageNumber?.textContent?.trim()).to.equal(p.expectedLastPage.toString());
    });
  });

  pagesAboveSeven.map(p => {
    it(`For above seven pages, up until page navigated to page 4, should only show 1 ellipsis`, async () => {
      const el = await fixture<SgdsPagination>(
        html`<sgds-pagination dataLength=${p.dataLength} itemsPerPage=${p.itemsPerPage}></sgds-pagination>`
      );

      const nextButton = el.shadowRoot?.querySelector("sgds-icon-button[ariaLabel='Next']") as SgdsIconButton;
      nextButton.click(); // go to 2
      await el.updateComplete;
      expect(el.shadowRoot?.querySelectorAll(".page-link.ellipsis").length).to.equal(p.expectedEllipsis);
      nextButton.click(); // go to 3
      await el.updateComplete;
      expect(el.shadowRoot?.querySelectorAll(".page-link.ellipsis").length).to.equal(p.expectedEllipsis);
      nextButton.click(); // go to 4
      await el.updateComplete;
      expect(el.shadowRoot?.querySelectorAll(".page-link.ellipsis").length).to.equal(p.expectedEllipsis);
    });
  });

  const pagesAboveSevenAtCurrentPage5 = [
    {
      dataLength: 16,
      currentPage: 5,
      itemsPerPage: 2,
      expectedPages: 6,
      expectedEllipsis: 1,
      expectedFirstPage: 1,
      expectedLastPage: 8
    }, //8 pages
    {
      dataLength: 18,
      currentPage: 5,
      itemsPerPage: 2,
      expectedPages: 6,
      expectedEllipsis: 2,
      expectedFirstPage: 1,
      expectedLastPage: 9
    }, //9 pages
    {
      dataLength: 20,
      currentPage: 5,
      itemsPerPage: 2,
      expectedPages: 6,
      expectedEllipsis: 2,
      expectedFirstPage: 1,
      expectedLastPage: 10
    } //10 pages
  ];

  pagesAboveSevenAtCurrentPage5.map(p => {
    it(`For above seven pages, currentPage=5, should only show ${p.expectedEllipsis} ellipsis`, async () => {
      const el = await fixture<SgdsPagination>(
        html`<sgds-pagination
          currentPage=${p.currentPage}
          dataLength=${p.dataLength}
          itemsPerPage=${p.itemsPerPage}
        ></sgds-pagination>`
      );

      expect(el.shadowRoot?.querySelectorAll(".page-link.ellipsis").length).to.equal(p.expectedEllipsis);

      const nextButton = el.shadowRoot?.querySelector("sgds-icon-button[ariaLabel='Next']") as SgdsIconButton;
      nextButton.click(); // go to 6
      await el.updateComplete;
      if (p.expectedLastPage === 10) {
        expect(el.shadowRoot?.querySelectorAll(".page-link.ellipsis").length).to.equal(2);
      } else {
        expect(el.shadowRoot?.querySelectorAll(".page-link.ellipsis").length).to.equal(1);
      }

      nextButton.click(); // go to 7
      await el.updateComplete;
      expect(el.shadowRoot?.querySelectorAll(".page-link.ellipsis").length).to.equal(1);
    });
  });
  it("when navigation=button, pagination direction button changes to sgds-button", async () => {
    const el = await fixture(html` <sgds-pagination dataLength="1" navigation="button"></sgds-pagination>`);
    assert.shadowDom.equal(
      el,
      `
      <nav aria-label="pagination" role="navigation">
      <ul class="pagination pagination-md">
      <sgds-button ariaLabel="Previous" variant="ghost" tone="brand" size="md" disabled="" target="_self" type="button">
      <sgds-icon name="arrow-left" size="md" slot="leftIcon"></sgds-icon>Prev
      </sgds-button>
      <li key="1" class="page-item active">
          <span class="page-link" tabindex="0" aria-current="true" aria-label="Current Page, Page 1" role="button">1</span>
        </li>
        <sgds-button ariaLabel="Next" variant="ghost" tone="brand" size="md" disabled="" target="_self" type="button">
      <sgds-icon name="arrow-right" size="md" slot="rightIcon"></sgds-icon>Next
      </sgds-button>
      </ul>
      </nav>
      `
    );
  });
});

describe("variant=number sgds-pagination", () => {
  it("can be semantically matched with the DOM", async () => {
    // 2 pages
    const el = await fixture(
      html` <sgds-pagination dataLength="10" itemsPerPage="5" variant="number"></sgds-pagination>`
    );
    assert.shadowDom.equal(
      el,
      `
      <nav aria-label="pagination" role="navigation">
      <ul class="pagination pagination-md">
      <li key="1" class="page-item active">
          <span class="page-link" tabindex="0" aria-current="true" aria-label="Current Page, Page 1" role="button">1</span>
        </li>
      <li key="2" class="page-item">
          <span class="page-link" tabindex="0" aria-current="false" aria-label="Go to Page 2" role="button">2</span>
        </li>
      </ul>
      </nav>
      `
    );
  });
  it("can be semantically matched with the DOM", async () => {
    // 5 pages
    const el = await fixture(
      html` <sgds-pagination dataLength="10" itemsPerPage="2" variant="number"></sgds-pagination>`
    );
    assert.shadowDom.equal(
      el,
      `
      <nav aria-label="pagination" role="navigation">
      <ul class="pagination pagination-md">
      <li key="1" class="page-item active">
          <span class="page-link" tabindex="0"  aria-label="Current Page, Page 1" aria-current="true" role="button">1</span>
        </li>
      <li key="2" class="page-item">
          <span class="page-link" tabindex="0" aria-label="Go to Page 2" aria-current="false" role="button">2</span>
        </li>
      <li key="3" class="page-item">
          <span class="page-link" tabindex="0" aria-label="Go to Page 3" aria-current="false" role="button">3</span>
        </li>
      <li key="4" class="page-item">
          <span class="page-link" tabindex="0" aria-label="Go to Page 4" aria-current="false" role="button">4</span>
        </li>
      <li key="5" class="page-item">
          <span class="page-link" tabindex="0" aria-label="Go to Page 5" aria-current="false" role="button">5</span>
        </li>
      </ul>
      </nav>
      `
    );
  });
});

describe("variant=button sgds-pagination", () => {
  it("can be semantically matched with the DOM", async () => {
    // 2 pages
    const el = await fixture(
      html` <sgds-pagination dataLength="10" itemsPerPage="5" variant="button"></sgds-pagination>`
    );
    assert.shadowDom.equal(
      el,
      `
      <nav aria-label="pagination" role="navigation">
      <ul class="pagination pagination-md">
      <sgds-icon-button ariaLabel="Previous" variant="ghost" tone="brand" size="md" disabled="" name="arrow-left" target="_self"></sgds-icon-button>
      <sgds-icon-button ariaLabel="Next" variant="ghost" tone="brand"size="md" name="arrow-right" target="_self"></sgds-icon-button>
      </ul>
      </nav>
      `
    );
  });

  it("when currentPage reaches the last page, the next arrow is disabled", async () => {
    const el = await fixture(
      html` <sgds-pagination dataLength="10" itemsPerPage="5" variant="button" currentPage="2"></sgds-pagination>`
    );

    const nextButton = el.shadowRoot?.querySelector("sgds-icon-button[ariaLabel='Next']");
    const prevButton = el.shadowRoot?.querySelector("sgds-icon-button[ariaLabel='Previous']");
    expect(nextButton).to.have.attribute("disabled");
    expect(prevButton).not.to.have.attribute("disabled");
  });
  it("when pages are less than 2, both arrows are disabled", async () => {
    const el = await fixture(
      html` <sgds-pagination dataLength="5" itemsPerPage="5" variant="button" currentPage="1"></sgds-pagination>`
    );

    const nextButton = el.shadowRoot?.querySelector("sgds-icon-button[ariaLabel='Next']");
    const prevButton = el.shadowRoot?.querySelector("sgds-icon-button[ariaLabel='Previous']");
    expect(nextButton).to.have.attribute("disabled");
    expect(prevButton).to.have.attribute("disabled");
  });

  it("when there are no pages, both arrows are disabled", async () => {
    const el = await fixture(html` <sgds-pagination></sgds-pagination>`);
    const nextButton = el.shadowRoot?.querySelector("sgds-icon-button[ariaLabel='Next']");
    const prevButton = el.shadowRoot?.querySelector("sgds-icon-button[ariaLabel='Previous']");
    expect(nextButton).to.have.attribute("disabled");
    expect(prevButton).to.have.attribute("disabled");
  });
});
describe("variant=description sgds-pagination", () => {
  it("can be semantically matched with the DOM", async () => {
    // 5 pages
    const el = await fixture(
      html` <sgds-pagination dataLength="10" itemsPerPage="2" variant="description"></sgds-pagination>`
    );
    assert.shadowDom.equal(
      el,
      `
      <nav aria-label="pagination" role="navigation">
      <ul class="pagination pagination-md">
      <sgds-icon-button ariaLabel="Previous" variant="ghost" tone="brand" size="md" disabled="" name="arrow-left" target="_self"></sgds-icon-button>
      <div class="pagination-description">Page 1 of 5</div>
      <sgds-icon-button ariaLabel="Next" variant="ghost" tone="brand" size="md" name="arrow-right" target="_self"></sgds-icon-button>
      </ul>
      </nav>
      `
    );
  });

  it("navigation clicks updates the description accordingly ", async () => {
    const el = await fixture<SgdsPagination>(
      html` <sgds-pagination dataLength="10" itemsPerPage="2" variant="description"></sgds-pagination>`
    );

    const nextButton = el.shadowRoot?.querySelector("sgds-icon-button[ariaLabel='Next']") as SgdsIconButton;
    const prevButton = el.shadowRoot?.querySelector("sgds-icon-button[ariaLabel='Previous']") as SgdsIconButton;
    nextButton.click();
    nextButton.click();

    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".pagination-description")?.textContent).to.contain("Page 3 of 5");

    prevButton.click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".pagination-description")?.textContent).to.contain("Page 2 of 5");
  });

  it("keyboard enter will simulate a click behaviour on the pages", async () => {
    const el = (await fixture(
      html`<sgds-pagination dataLength="40" limit="3" itemsPerPage="5" currentPage="1"></sgds-pagination> `
    )) as SgdsPagination;

    const pagesHandler = sinon.spy();
    el.addEventListener("sgds-page-change", pagesHandler);

    const pageOne = el.shadowRoot?.querySelectorAll("li")[0];
    const pageOneLink = el.shadowRoot?.querySelectorAll("li")[0].querySelector("span");
    const pageTwo = el.shadowRoot?.querySelectorAll("li")[1];
    const pageTwoLink = el.shadowRoot?.querySelectorAll("li")[1].querySelector("span");

    expect(pageOne?.classList.value).to.contain("active");
    expect(pageTwo?.classList.value).to.not.contain("active");
    expect(pageOneLink?.getAttribute("tabindex")).to.equal("0"); //pages li will maintain tab index 0 regardless of active
    expect(pageTwoLink?.getAttribute("tabindex")).to.equal("0");

    await sendKeys({ press: "Tab" });
    await sendKeys({ press: "Tab" });
    await sendKeys({ press: "Enter" });

    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll("li")[2]?.classList.value).to.not.contain("active");
    expect(el.shadowRoot?.querySelectorAll("li")[1]?.classList.value).to.contain("active");

    expect(pagesHandler).to.be.calledOnce;
  });
  it("keyboard enter on direction buttons will simulate a click behaviour on the pages", async () => {
    const el = (await fixture(
      html`<sgds-pagination dataLength="40" itemsPerPage="5" currentPage="1"></sgds-pagination> `
    )) as SgdsPagination;

    const pagesHandler = sinon.spy();
    el.addEventListener("sgds-page-change", pagesHandler);

    const nextBtn = el.shadowRoot?.querySelectorAll("sgds-icon-button")[1];
    nextBtn?.focus();
    await sendKeys({ press: "Enter" });

    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".page-item.active")?.textContent?.trim()).to.equal("2");

    const prevBtn = el.shadowRoot?.querySelectorAll("sgds-icon-button")[0];
    prevBtn?.focus();
    await sendKeys({ press: "Enter" });

    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".page-item.active")?.textContent?.trim()).to.equal("1");
  });
  it("clicking a page should add the active class to the respective li", async () => {
    const el = (await fixture(
      html` <sgds-pagination limit="3" itemsPerPage="1" dataLength="40" currentPage="1"></sgds-pagination> `
    )) as SgdsPagination;

    const pagesHandler = sinon.spy();
    el.addEventListener("sgds-page-change", pagesHandler);
    const pageOne = el.shadowRoot?.querySelectorAll("li")[0];
    const pageTwo = el.shadowRoot?.querySelectorAll("li")[1];

    expect(pageOne?.classList.value).to.contain("active");

    pageTwo?.querySelector("span")?.click();
    await el.updateComplete;

    expect(pageOne?.classList.value).to.not.contain("active");
    expect(pageTwo?.classList.value).to.contain("active");

    expect(pagesHandler).to.be.calledOnce;
  });
});
