"use client";

import { SgdsTabGroup, SgdsTab, SgdsTabPanel, SgdsIcon } from "@govtechsg/sgds-web-component/react";

export const Tab = () => {
  return (
    <>
      <SgdsTabGroup variant="underlined" orientation="horizontal">
        <SgdsTab slot="nav" active panel="one" variant="underlined" orientation="horizontal">
          <SgdsIcon slot="icon" name="map"></SgdsIcon>
          <span>hellotab</span>
        </SgdsTab>
        <SgdsTab slot="nav" panel="two" variant="underlined" orientation="horizontal">
          two
        </SgdsTab>
        <SgdsTab slot="nav" panel="three" variant="underlined" orientation="horizontal">
          three
        </SgdsTab>
        <SgdsTabPanel name="one">one</SgdsTabPanel>
        <SgdsTabPanel name="two">two</SgdsTabPanel>
        <SgdsTabPanel name="three">three</SgdsTabPanel>
      </SgdsTabGroup>

      <SgdsTabGroup orientation="horizontal" density="compact">
        <SgdsTab slot="nav" active panel="one" variant="underlined" orientation="horizontal" density="compact">
          hellotab
        </SgdsTab>
        <SgdsTab slot="nav" panel="two" variant="underlined" orientation="horizontal" density="compact">
          two
        </SgdsTab>
        <SgdsTab slot="nav" panel="three" variant="underlined" orientation="horizontal" density="compact">
          three
        </SgdsTab>
        <SgdsTabPanel name="one">one</SgdsTabPanel>
        <SgdsTabPanel name="two">two</SgdsTabPanel>
        <SgdsTabPanel name="three">three</SgdsTabPanel>
      </SgdsTabGroup>

      <SgdsTabGroup orientation="horizontal">
        <SgdsTab slot="nav" active panel="one" variant="underlined" orientation="horizontal">
          lukhei testing
        </SgdsTab>
        <SgdsTab slot="nav" panel="two" variant="underlined" orientation="horizontal">
          disabled
        </SgdsTab>
        <SgdsTab slot="nav" panel="three" variant="underlined" orientation="horizontal">
          <SgdsIcon slot="icon" name="placeholder"></SgdsIcon>
          three
        </SgdsTab>
        <SgdsTabPanel name="one">one</SgdsTabPanel>
        <SgdsTabPanel name="two">two</SgdsTabPanel>
        <SgdsTabPanel name="three">three</SgdsTabPanel>
      </SgdsTabGroup>

      <SgdsTabGroup variant="underlined" orientation="vertical" density="compact">
        <SgdsTab slot="nav" active panel="one" variant="underlined" orientation="vertical" density="compact">
          lukhei test
        </SgdsTab>
        <SgdsTab slot="nav" disabled panel="two" variant="underlined" orientation="vertical" density="compact">
          disabled
        </SgdsTab>
        <SgdsTab slot="nav" panel="three" variant="underlined" orientation="vertical" density="compact">
          <SgdsIcon slot="icon" name="placeholder"></SgdsIcon>
          three
        </SgdsTab>
        <SgdsTabPanel name="one">one</SgdsTabPanel>
        <SgdsTabPanel name="two">two</SgdsTabPanel>
        <SgdsTabPanel name="three">three</SgdsTabPanel>
      </SgdsTabGroup>

       <SgdsTabGroup variant="solid" orientation="horizontal">
        <SgdsTab slot="nav" active panel="one" variant="solid" orientation="horizontal">
          <SgdsIcon slot="icon" name="map"></SgdsIcon>
          <span>hellotab</span>
        </SgdsTab>
        <SgdsTab slot="nav" panel="two" variant="solid" orientation="horizontal">
          two
        </SgdsTab>
        <SgdsTab slot="nav" panel="three" variant="solid" orientation="horizontal">
          three
        </SgdsTab>
        <SgdsTabPanel name="one">one</SgdsTabPanel>
        <SgdsTabPanel name="two">two</SgdsTabPanel>
        <SgdsTabPanel name="three">three</SgdsTabPanel>
      </SgdsTabGroup>
    </>
  );
};
