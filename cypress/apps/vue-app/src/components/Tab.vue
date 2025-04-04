<template>
    <sgds-tab-group variant="underlined" orientation="horizontal">
        <sgds-tab slot="nav" state="active" panel="one">
            <sgds-icon slot="icon" name="map"></sgds-icon>
            <span>hellotab</span>
        </sgds-tab>
        <sgds-tab slot="nav" panel="two">
            two
        </sgds-tab>
        <sgds-tab slot="nav" state="active" panel="three">
            three
        </sgds-tab>
        <sgds-tab-panel name="one">one</sgds-tab-panel>
        <sgds-tab-panel name="two">two</sgds-tab-panel>
        <sgds-tab-panel name="three">three</sgds-tab-panel>
        </sgds-tab-group>
        <sgds-tab-group orientation="horizontal" density="compact">
        <sgds-tab slot="nav" state="active" panel="one">
            hellotab
        </sgds-tab>
        <sgds-tab slot="nav" panel="two">
            two
        </sgds-tab>
        <sgds-tab slot="nav" state="active" panel="three">
            three
        </sgds-tab>
        <sgds-tab-panel name="one">one</sgds-tab-panel>
        <sgds-tab-panel name="two">two</sgds-tab-panel>
        <sgds-tab-panel name="three">three</sgds-tab-panel>
    </sgds-tab-group>
    <sgds-tab-group id="tabs-lukhei-test" orientation="horizontal">
        <sgds-tab slot="nav" panel="one">
          lukhei testing
        </sgds-tab>
        <sgds-tab slot="nav" panel="two">
          disabled
        </sgds-tab>
        <sgds-tab slot="nav" panel="three">
          <sgds-icon slot="icon" name="placeholder"></sgds-icon>
          three
        </sgds-tab>

        <sgds-tab-panel name="one">one</sgds-tab-panel>
        <sgds-tab-panel name="two">two</sgds-tab-panel>
        <sgds-tab-panel name="three">three</sgds-tab-panel>
    </sgds-tab-group>
    <sgds-tab-group variant="underlined" orientation="vertical" density="compact">
        <sgds-tab slot="nav" panel="one" variant="solid">
          lukhei test
        </sgds-tab>
        <sgds-tab slot="nav" disabled panel="two">
          cdisabled
        </sgds-tab>
        <sgds-tab slot="nav" panel="three">
          <sgds-icon slot="icon" name="placeholder"></sgds-icon>
          three
        </sgds-tab>
        <sgds-tab-panel name="one">one</sgds-tab-panel>
        <sgds-tab-panel name="two">two</sgds-tab-panel>
        <sgds-tab-panel name="three">three</sgds-tab-panel>
    </sgds-tab-group>
</template>
