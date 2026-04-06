'use client';

import { SgdsTabGroup, SgdsTab, SgdsTabPanel, SgdsIcon } from "@govtechsg/sgds-web-component/react";

export const Tab = () => {
  return (
    <>
      <SgdsTabGroup variant="underlined" orientation="horizontal">
        <SgdsTab slot="nav" state="active" panel="one">
          <SgdsIcon slot="icon" name="map"></SgdsIcon>
          <span>hellotab</span>
        </SgdsTab>
        <SgdsTab slot="nav" panel="two">two</SgdsTab>
        <SgdsTab slot="nav" state="active" panel="three">three</SgdsTab>
        <SgdsTabPanel name="one">one</SgdsTabPanel>
        <SgdsTabPanel name="two">two</SgdsTabPanel>
        <SgdsTabPanel name="three">three</SgdsTabPanel>
      </SgdsTabGroup>

      <SgdsTabGroup orientation="horizontal" density="compact">
        <SgdsTab slot="nav" state="active" panel="one">hellotab</SgdsTab>
        <SgdsTab slot="nav" panel="two">two</SgdsTab>
        <SgdsTab slot="nav" state="active" panel="three">three</SgdsTab>
        <SgdsTabPanel name="one">one</SgdsTabPanel>
        <SgdsTabPanel name="two">two</SgdsTabPanel>
        <SgdsTabPanel name="three">three</SgdsTabPanel>
      </SgdsTabGroup>

      <SgdsTabGroup id="tabs-lukhei-test" orientation="horizontal">
        <SgdsTab slot="nav" panel="one">lukhei testing</SgdsTab>
        <SgdsTab slot="nav" panel="two">disabled</SgdsTab>
        <SgdsTab slot="nav" panel="three">
          <SgdsIcon slot="icon" name="placeholder"></SgdsIcon>
          three
        </SgdsTab>
        <SgdsTabPanel name="one">one</SgdsTabPanel>
        <SgdsTabPanel name="two">two</SgdsTabPanel>
        <SgdsTabPanel name="three">three</SgdsTabPanel>
      </SgdsTabGroup>

      <SgdsTabGroup variant="underlined" orientation="vertical" density="compact">
        <SgdsTab slot="nav" panel="one" variant="solid">lukhei test</SgdsTab>
        <SgdsTab slot="nav" disabled panel="two">cdisabled</SgdsTab>
        <SgdsTab slot="nav" panel="three">
          <SgdsIcon slot="icon" name="placeholder"></SgdsIcon>
          three
        </SgdsTab>
        <SgdsTabPanel name="one">one</SgdsTabPanel>
        <SgdsTabPanel name="two">two</SgdsTabPanel>
        <SgdsTabPanel name="three">three</SgdsTabPanel>
      </SgdsTabGroup>
    </>
  );
};
