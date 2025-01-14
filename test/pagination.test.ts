import { assert, fixture, expect } from "@open-wc/testing";
import { html } from "lit";
import { SgdsIconButton, SgdsPagination } from "../src/components";
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
      <sgds-icon-button ariaLabel="Prev" variant="ghost" size="md" disabled="" name="arrow-left" target="_self"></sgds-icon-button>
      <li key="1" class="page-item active">
          <span class="page-link" tabindex="0">1</span>
        </li>
      <sgds-icon-button ariaLabel="Next" variant="ghost" size="md" disabled="" name="arrow-right" target="_self"></sgds-icon-button>
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
      <sgds-icon-button ariaLabel="Prev" variant="ghost" size="md" disabled="" name="arrow-left" target="_self"></sgds-icon-button>
      <li key="1" class="page-item active">
          <span class="page-link" tabindex="0">1</span>
        </li>
      <li key="2" class="page-item">
          <span class="page-link" tabindex="0">2</span>
        </li>
      <sgds-icon-button ariaLabel="Next" variant="ghost" size="md" name="arrow-right" target="_self"></sgds-icon-button>
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
      <sgds-icon-button ariaLabel="Prev" variant="ghost" size="md"  name="arrow-left" target="_self"></sgds-icon-button>
      <li key="1" class="page-item">
          <span class="page-link" tabindex="0">1</span>
        </li>
      <li key="2" class="page-item active">
          <span class="page-link" tabindex="0">2</span>
        </li>
      <sgds-icon-button ariaLabel="Next" variant="ghost" size="md" disabled="" name="arrow-right" target="_self"></sgds-icon-button>
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
          <span class="page-link" tabindex="0">1</span>
        </li>
      <li key="2" class="page-item">
          <span class="page-link" tabindex="0">2</span>
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
          <span class="page-link" tabindex="0">1</span>
        </li>
      <li key="2" class="page-item">
          <span class="page-link" tabindex="0">2</span>
        </li>
      <li key="3" class="page-item">
          <span class="page-link" tabindex="0">3</span>
        </li>
      <li key="4" class="page-item">
          <span class="page-link" tabindex="0">4</span>
        </li>
      <li key="5" class="page-item">
          <span class="page-link" tabindex="0">5</span>
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
      <sgds-icon-button ariaLabel="Prev" variant="ghost" size="md" disabled="" name="arrow-left" target="_self"></sgds-icon-button>
      <sgds-icon-button ariaLabel="Next" variant="ghost" size="md" name="arrow-right" target="_self"></sgds-icon-button>
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
    const prevButton = el.shadowRoot?.querySelector("sgds-icon-button[ariaLabel='Prev']");
    expect(nextButton).to.have.attribute("disabled");
    expect(prevButton).not.to.have.attribute("disabled");
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
      <sgds-icon-button ariaLabel="Prev" variant="ghost" size="md" disabled="" name="arrow-left" target="_self"></sgds-icon-button>
      <div class="pagination-description">Page 1 of 5</div>
      <sgds-icon-button ariaLabel="Next" variant="ghost" size="md" name="arrow-right" target="_self"></sgds-icon-button>
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
    const prevButton = el.shadowRoot?.querySelector("sgds-icon-button[ariaLabel='Prev']") as SgdsIconButton;
    nextButton.click();
    nextButton.click();

    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".pagination-description")?.textContent).to.contain("Page 3 of 5");

    prevButton.click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".pagination-description")?.textContent).to.contain("Page 2 of 5");
  });
});
