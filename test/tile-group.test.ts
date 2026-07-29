import { html } from "lit";
import { expect, fixture } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import sinon from "sinon";
import { SgdsTile, SgdsTileGroup } from "../src/components";
import "../src/index";

describe("<sgds-tile-group>", () => {
  describe("radio mode (default)", () => {
    it("renders with default variant radio", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      expect(el.variant).to.equal("radio");
    });

    it("sets variant on child tiles via slotchange", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      tiles.forEach(tile => {
        expect(tile.variant).to.equal("radio");
      });
    });

    it("clicking a tile selects it and deselects others", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
          <sgds-tile value="c"><span slot="title">C</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      (tiles[1] as HTMLElement).click();
      await el.updateComplete;

      expect(tiles[0].checked).to.be.false;
      expect(tiles[1].checked).to.be.true;
      expect(tiles[2].checked).to.be.false;
      expect(el.value).to.equal("b");
    });

    it("clicking another tile switches selection", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one" value="a">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      expect(tiles[0].checked).to.be.true;

      (tiles[1] as HTMLElement).click();
      await el.updateComplete;

      expect(tiles[0].checked).to.be.false;
      expect(tiles[1].checked).to.be.true;
      expect(el.value).to.equal("b");
    });

    it("emits sgds-change on selection", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const handler = sinon.spy();
      el.addEventListener("sgds-change", handler);

      const tiles = el.querySelectorAll("sgds-tile");
      (tiles[0] as HTMLElement).click();
      await el.updateComplete;

      expect(handler).to.have.been.calledOnce;
      expect(handler.firstCall.args[0].detail.value).to.equal("a");
    });

    it("sets initial checked state from value prop", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one" value="b">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      expect(tiles[0].checked).to.be.false;
      expect(tiles[1].checked).to.be.true;
    });

    it("does not select a disabled tile on click", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b" disabled><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      (tiles[1] as HTMLElement).click();
      await el.updateComplete;

      expect(tiles[1].checked).to.be.false;
      expect(el.value).to.equal("");
    });
  });

  describe("checkbox mode", () => {
    it("sets variant checkbox on child tiles", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select many" variant="checkbox">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      tiles.forEach(tile => {
        expect(tile.variant).to.equal("checkbox");
      });
    });

    it("clicking tiles toggles them independently", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select many" variant="checkbox">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
          <sgds-tile value="c"><span slot="title">C</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");

      (tiles[0] as HTMLElement).click();
      await el.updateComplete;
      expect(tiles[0].checked).to.be.true;
      expect(el.value).to.equal("a");

      (tiles[2] as HTMLElement).click();
      await el.updateComplete;
      expect(tiles[0].checked).to.be.true;
      expect(tiles[2].checked).to.be.true;
      expect(el.value).to.equal("a,c");
    });

    it("clicking a checked tile unchecks it", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select many" variant="checkbox" value="a,b">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      (tiles[0] as HTMLElement).click();
      await el.updateComplete;

      expect(tiles[0].checked).to.be.false;
      expect(tiles[1].checked).to.be.true;
      expect(el.value).to.equal("b");
    });

    it("sets initial checked states from comma-separated value", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select many" variant="checkbox" value="a,c">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
          <sgds-tile value="c"><span slot="title">C</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      expect(tiles[0].checked).to.be.true;
      expect(tiles[1].checked).to.be.false;
      expect(tiles[2].checked).to.be.true;
    });
  });

  describe("keyboard navigation", () => {
    it("arrow right moves focus and selects next tile in radio mode", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one" value="a">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
          <sgds-tile value="c"><span slot="title">C</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      (tiles[0] as HTMLElement).focus();
      await sendKeys({ press: "ArrowRight" });
      await el.updateComplete;

      expect(el.value).to.equal("b");
      expect(tiles[1].checked).to.be.true;
      expect(tiles[0].checked).to.be.false;
    });

    it("arrow left wraps to last tile in radio mode", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one" value="a">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
          <sgds-tile value="c"><span slot="title">C</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      (tiles[0] as HTMLElement).focus();
      await sendKeys({ press: "ArrowLeft" });
      await el.updateComplete;

      expect(el.value).to.equal("c");
      expect(tiles[2].checked).to.be.true;
    });

    it("space selects focused tile in radio mode", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      (tiles[0] as HTMLElement).focus();
      await sendKeys({ press: " " });
      await el.updateComplete;

      expect(el.value).to.equal("a");
      expect(tiles[0].checked).to.be.true;
    });

    it("space toggles focused tile in checkbox mode", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select many" variant="checkbox">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      (tiles[0] as HTMLElement).focus();
      await sendKeys({ press: " " });
      await el.updateComplete;

      expect(tiles[0].checked).to.be.true;
      expect(el.value).to.equal("a");

      // pressing space again unchecks
      await sendKeys({ press: " " });
      await el.updateComplete;

      expect(tiles[0].checked).to.be.false;
      expect(el.value).to.equal("");
    });

    it("skips disabled tiles during keyboard navigation", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one" value="a">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b" disabled><span slot="title">B</span></sgds-tile>
          <sgds-tile value="c"><span slot="title">C</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      (tiles[0] as HTMLElement).focus();
      await sendKeys({ press: "ArrowRight" });
      await el.updateComplete;

      // should skip B (disabled) and land on C
      expect(el.value).to.equal("c");
      expect(tiles[2].checked).to.be.true;
    });
  });

  describe("disabled state", () => {
    it("propagates disabled to all child tiles", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one" disabled>
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      tiles.forEach(tile => {
        expect(tile.disabled).to.be.true;
      });
    });
  });

  describe("invalid state", () => {
    it("propagates invalid to child tiles", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      el.setInvalid(true);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      tiles.forEach(tile => {
        expect(tile.invalid).to.be.true;
      });
    });

    it("shows invalid feedback when hasFeedback is true", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one" hasFeedback invalidFeedback="Please select one">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      el.setInvalid(true);
      await el.updateComplete;

      const feedback = el.shadowRoot!.querySelector(".invalid-feedback");
      expect(feedback).to.exist;
      expect(feedback!.textContent!.trim()).to.equal("Please select one");
    });
  });

  describe("form integration", () => {
    it("participates in form submission with correct value", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sgds-tile-group label="Select one" name="plan" value="b">
            <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
            <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
          </sgds-tile-group>
        </form>
      `);

      const formData = new FormData(form);
      expect(formData.get("plan")).to.equal("b");
    });

    it("reports invalid when required and no value", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one" name="plan" required hasFeedback>
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const isValid = el.reportValidity();
      await el.updateComplete;

      expect(isValid).to.be.false;
      expect(el.invalid).to.be.true;
    });
  });

  describe("tabindex management", () => {
    it("in radio mode, only checked tile has tabindex 0", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one" value="b">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
          <sgds-tile value="c"><span slot="title">C</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      expect(tiles[0].tabIndex).to.equal(-1);
      expect(tiles[1].tabIndex).to.equal(0);
      expect(tiles[2].tabIndex).to.equal(-1);
    });

    it("in radio mode with no value, first tile has tabindex 0", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select one">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      expect(tiles[0].tabIndex).to.equal(0);
      expect(tiles[1].tabIndex).to.equal(-1);
    });

    it("in checkbox mode, all enabled tiles have tabindex 0", async () => {
      const el = await fixture<SgdsTileGroup>(html`
        <sgds-tile-group label="Select many" variant="checkbox">
          <sgds-tile value="a"><span slot="title">A</span></sgds-tile>
          <sgds-tile value="b"><span slot="title">B</span></sgds-tile>
          <sgds-tile value="c" disabled><span slot="title">C</span></sgds-tile>
        </sgds-tile-group>
      `);
      await el.updateComplete;

      const tiles = el.querySelectorAll("sgds-tile");
      expect(tiles[0].tabIndex).to.equal(0);
      expect(tiles[1].tabIndex).to.equal(0);
      expect(tiles[2].tabIndex).to.equal(-1);
    });
  });
});
