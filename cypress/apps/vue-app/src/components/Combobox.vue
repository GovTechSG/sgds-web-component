<template>
    <sgds-combo-box value="1" .menuList='[
      { "label": "John Smith", "value": "1" },
      { "label": "Jack Adams", "value": "2" },
      { "label": "Regina Bride", "value": "3" },
      { "label": "Christian Dior", "value": "4" },
      { "label": "Prada Low", "value": "5" },
      { "label": "Chloe Delight", "value": "6" },
      { "label": "Jade Apheremal", "value": "7" },
      { "label": "Louis Vuitton", "value": "8" }
    ]' label="label" hintText="hint" hasFeedback="true" invalidFeedback="test">
      </sgds-combo-box>

    <sgds-combo-box value="1;2;3;4;5;6;7;8" .menuList='[
      { "label": "John Smith", "value": "1" },
      { "label": "Jack Adams", "value": "2" },
      { "label": "Regina Bride", "value": "3" },
      { "label": "Christian Dior", "value": "4" },
      { "label": "Prada Low", "value": "5" },
      { "label": "Chloe Delight", "value": "6" },
      { "label": "Jade Apheremal", "value": "7" },
      { "label": "Louis Vuitton", "value": "8" }
      ]' multiSelect label="label" hintText="multiple" hasFeedback="true" invalidFeedback="test"
    >
    </sgds-combo-box>
</template>
