import { html } from 'lit-html';

export const Template = args => {
  return html`
    <sgds-table
      ?striped=${args.striped}
      ?bordered=${args.bordered}
      ?borderless=${args.borderless}
      ?hover=${args.hover}
      .size=${args.size}
      .variant=${args.variant}
      .responsive=${args.responsive}
      .tableHeaders=${args.tableHeaders}
      .tableData=${args.tableData}
      .sort=${args.sort}
      .removableSort=${args.removableSort}
    >
    </sgds-table>
  `;
};

export const TemplateBreakpointSpecific = args => {
  return html`
    <sgds-table .responsive=${`sm`} .tableHeaders=${args.tableHeaders} .tableData=${args.tableData}> </sgds-table>
    <sgds-table .responsive=${`md`} .tableHeaders=${args.tableHeaders} .tableData=${args.tableData}> </sgds-table>
    <sgds-table .responsive=${`lg`} .tableHeaders=${args.tableHeaders} .tableData=${args.tableData}> </sgds-table>
    <sgds-table .responsive=${`xl`} .tableHeaders=${args.tableHeaders} .tableData=${args.tableData}> </sgds-table>
  `;
};

export const args = {
  tableHeaders: ['#', 'First Names', 'Last Name', 'Username'],
  tableData: [
    ['1', 'John', 'Doe', '@johndoe'],
    ['2', 'Jane', 'Doe', '@janedoe'],
    ['3', 'Bob', 'Smith', '@bobsmith']
  ]
};

// ## Small Table

// Use `size="sm"` to make tables compact by cutting cell padding in half.

// <Canvas>
//   <Story
//     name='Small table'
//     args={{
//       tableHeaders: ["#", "First Names", "Last Name", "Username"],
//       tableData: [
//         ["1", "John", "Doe", "@johndoe"],
//         ["2", "Jane", "Doe", "@janedoe"],
//         ["3", "Bob", "Smith", "@bobsmith"],
//       ],
//       size: "sm",
//     }}
//   >
//     {Template.bind({})}
//   </Story>
// </Canvas>

// ## Sorting

// Sorting on a column is enabled by adding the `sort` property. The sorting algorithm is based on javascript array.sort() method. In ascending order from bottom, alphabets come first, followed by numbers, and then symbols. Similarly, in descending order from bottom, symbols come first, followed by numbers, and then alphabets.

// <Canvas>
//   <Story
//     name='Sorting'
//     args={{
//       tableHeaders: ["Serial No.", "Title", "Name", "Username"],
//       tableData: [
//         ["S901021", "David", "Doe", "@johndoe"],
//         ["S892002", "2be", "Zoe", "@janedoe"],
//         ["S879192", "#55", "Smith", "@bobsmith"],
//         ["S829132", "@hey", "Alex", "@davidsmith"],
//       ],
//       bordered: true,
//       sort: true,
//     }}
//   >
//     {Template.bind({})}
//   </Story>
// </Canvas>

// ## Removable Sort

// When `removableSort` is present, the third click removes the sorting from the column.

// <Canvas>
//   <Story
//     name='Removable Sort'
//     args={{
//       tableHeaders: ["#", "First Names", "Last Name", "Username"],
//       tableData: [
//         ["1", "John", "Doe", "@johndoe"],
//         ["2", "Jane", "Doe", "@janedoe"],
//         ["3", "Bob", "Smith", "@bobsmith"],
//       ],
//       bordered: true,
//       sort: true,
//       removableSort: true,
//     }}
//   >
//     {Template.bind({})}
//   </Story>
// </Canvas>

// ## Striped Body

// Adds zebra-striping using striped to table row within the `<tbody>`.

// <Canvas>
//   <Story
//     name='Striped Body'
//     args={{
//       tableHeaders: ["#", "First Names", "Last Name", "Username"],
//       tableData: [
//         ["1", "John", "Doe", "@johndoe"],
//         ["2", "Jane", "Doe", "@janedoe"],
//         ["3", "Bob", "Smith", "@bobsmith"],
//       ],
//       striped: true,
//     }}
//   >
//     {Template.bind({})}
//   </Story>
// </Canvas>

// ## Bordered Body

// Use `bordered` to add borders on all sides of the table and cells.

// <Canvas>
//   <Story
//     name='Bordered Body'
//     args={{
//       tableHeaders: ["#", "First Names", "Last Name", "Username"],
//       tableData: [
//         ["1", "John", "Doe", "@johndoe"],
//         ["2", "Jane", "Doe", "@janedoe"],
//         ["3", "Bob", "Smith", "@bobsmith"],
//       ],
//       bordered: true,
//     }}
//   >
//     {Template.bind({})}
//   </Story>
// </Canvas>

// ## Borderless Body

// Add `borderless` to remove all borders on the table and cells, including table header.

// <Canvas>
//   <Story
//     name='Borderless Body'
//     args={{
//       tableHeaders: ["#", "First Names", "Last Name", "Username"],
//       tableData: [
//         ["1", "John", "Doe", "@johndoe"],
//         ["2", "Jane", "Doe", "@janedoe"],
//         ["3", "Bob", "Smith", "@bobsmith"],
//       ],
//       borderless: true,
//     }}
//   >
//     {Template.bind({})}
//   </Story>
// </Canvas>

// ## Hovered Body

// Use hover to enable a hover state on table rows within a `<tbody>`.

// <Canvas>
//   <Story
//     name='Hovered Body'
//     args={{
//       tableHeaders: ["#", "First Names", "Last Name", "Username"],
//       tableData: [
//         ["1", "John", "Doe", "@johndoe"],
//         ["2", "Jane", "Doe", "@janedoe"],
//         ["3", "Bob", "Smith", "@bobsmith"],
//       ],
//       hover: true,
//     }}
//   >
//     {Template.bind({})}
//   </Story>
// </Canvas>

// ## Dark Table

// Use `variant="dark"` to invert the colors of the table and get light text on a dark background.

// <Canvas>
//   <Story
//     name='Dark mode'
//     args={{
//       tableHeaders: ["#", "First Names", "Last Name", "Username"],
//       tableData: [
//         ["1", "John", "Doe", "@johndoe"],
//         ["2", "Jane", "Doe", "@janedoe"],
//         ["3", "Bob", "Smith", "@bobsmith"],
//       ],
//       variant: "dark",
//     }}
//   >
//     {Template.bind({})}
//   </Story>
// </Canvas>

// ## Responsive

// Responsive tables allow tables to be scrolled horizontally with ease.

// ## Always Responsive

// Across every breakpoint, use `responsive` for horizontally scrolling tables. Responsive tables are wrapped automatically in a `div`. The following example has 12 columns that are scrollable horizontally.

// <Canvas>
//   <Story
//     name='Responsive'
//     args={{
//       tableHeaders: [
//         "#",
//         "Table heading",
//         "Table heading",
//         "Table heading",
//         "Table heading",
//         "Table heading",
//         "Table heading",
//         "Table heading",
//         "Table heading",
//         "Table heading",
//         "Table heading",
//         "Table heading",
//       ],
//       tableData: [
//         [
//           "1",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//         ],
//         [
//           "2",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//         ],
//         [
//           "3",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//         ],
//       ],
//       responsive: true,
//     }}
//   >
//     {Template.bind({})}
//   </Story>
// </Canvas>

// ## Breakpoint Specific

// Use `responsive="sm"`, `responsive="md"` , `responsive="lg"`, or `responsive="xl"` as needed to create responsive tables up to a particular breakpoint. From that breakpoint and up, the table will behave normally and not scroll horizontally.

// <Canvas>
//   <Story
//     name='Breakpoint specific'
//     args={{
//       tableHeaders: [
//         "#",
//         "Table heading",
//         "Table heading",
//         "Table heading",
//         "Table heading",
//         "Table heading",
//         "Table heading",
//       ],
//       tableData: [
//         [
//           "1",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//         ],
//         [
//           "2",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//         ],
//         [
//           "3",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//           "Table cell",
//         ],
//       ],
//     }}
//   >
//     {TemplateBreakpointSpecific.bind({})}
//   </Story>
// </Canvas>
