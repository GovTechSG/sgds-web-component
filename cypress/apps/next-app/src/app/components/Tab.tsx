export const Tab = () => {
  return (
    <>
      <sgds-tab-group variant="underlined" orientation="horizontal" suppressHydrationWarning>
        <sgds-tab slot="nav" state="active" panel="one" suppressHydrationWarning>
          <sgds-icon slot="icon" name="map" suppressHydrationWarning></sgds-icon>
          <span>hellotab</span>
        </sgds-tab>
        <sgds-tab slot="nav" panel="two" suppressHydrationWarning>two</sgds-tab>
        <sgds-tab slot="nav" state="active" panel="three" suppressHydrationWarning>three</sgds-tab>
        <sgds-tab-panel name="one" suppressHydrationWarning>one</sgds-tab-panel>
        <sgds-tab-panel name="two" suppressHydrationWarning>two</sgds-tab-panel>
        <sgds-tab-panel name="three" suppressHydrationWarning>three</sgds-tab-panel>
      </sgds-tab-group>

      <sgds-tab-group orientation="horizontal" density="compact" suppressHydrationWarning>
        <sgds-tab slot="nav" state="active" panel="one" suppressHydrationWarning>hellotab</sgds-tab>
        <sgds-tab slot="nav" panel="two" suppressHydrationWarning>two</sgds-tab>
        <sgds-tab slot="nav" state="active" panel="three" suppressHydrationWarning>three</sgds-tab>
        <sgds-tab-panel name="one" suppressHydrationWarning>one</sgds-tab-panel>
        <sgds-tab-panel name="two" suppressHydrationWarning>two</sgds-tab-panel>
        <sgds-tab-panel name="three" suppressHydrationWarning>three</sgds-tab-panel>
      </sgds-tab-group>

      <sgds-tab-group id="tabs-lukhei-test" orientation="horizontal" suppressHydrationWarning>
        <sgds-tab slot="nav" panel="one" suppressHydrationWarning>lukhei testing</sgds-tab>
        <sgds-tab slot="nav" panel="two" suppressHydrationWarning>disabled</sgds-tab>
        <sgds-tab slot="nav" panel="three" suppressHydrationWarning>
          <sgds-icon slot="icon" name="placeholder" suppressHydrationWarning></sgds-icon>
          three
        </sgds-tab>
        <sgds-tab-panel name="one" suppressHydrationWarning>one</sgds-tab-panel>
        <sgds-tab-panel name="two" suppressHydrationWarning>two</sgds-tab-panel>
        <sgds-tab-panel name="three" suppressHydrationWarning>three</sgds-tab-panel>
      </sgds-tab-group>

      <sgds-tab-group variant="underlined" orientation="vertical" density="compact" suppressHydrationWarning>
        <sgds-tab slot="nav" panel="one" variant="solid" suppressHydrationWarning>lukhei test</sgds-tab>
        <sgds-tab slot="nav" disabled panel="two" suppressHydrationWarning>cdisabled</sgds-tab>
        <sgds-tab slot="nav" panel="three" suppressHydrationWarning>
          <sgds-icon slot="icon" name="placeholder" suppressHydrationWarning></sgds-icon>
          three
        </sgds-tab>
        <sgds-tab-panel name="one" suppressHydrationWarning>one</sgds-tab-panel>
        <sgds-tab-panel name="two" suppressHydrationWarning>two</sgds-tab-panel>
        <sgds-tab-panel name="three" suppressHydrationWarning>three</sgds-tab-panel>
      </sgds-tab-group>
    </>
  );
};
