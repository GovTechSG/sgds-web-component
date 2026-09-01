import { html } from "lit";

const NoRowsTemplate = () => html`
  <sgds-data-table>
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const CustomNoDataTemplate = () => html`
  <sgds-data-table>
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
    <div slot="no-data" class="sgds:flex sgds:flex-col sgds:items-center">
      <div class="sgds:mb-paragraph-sm">
        <sgds-icon name="exclamation-circle-fill" size="xl" class="sgds:text-default"></sgds-icon>
      </div>
      No records found. Try adjusting your search or filters.
    </div>
  </sgds-data-table>
`;

const MultiSelectTemplate = () => html`
  <sgds-data-table currentPage="1" dataLength="3" itemsPerPage="5" multiSelect>
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>John</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@johndoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Jane</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@janedoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Bob</sgds-data-table-cell>
      <sgds-data-table-cell>Smith</sgds-data-table-cell>
      <sgds-data-table-cell>@bobsmith</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const MultiSelectRowSelectEventTemplate = () => html`
  <div class="event-demo">
    <sgds-data-table
      currentPage="1"
      dataLength="6"
      itemsPerPage="3"
      multiSelect
      @sgds-row-select=${e => {
        const output = e.target.closest(".event-demo")?.querySelector(".event-output");
        if (output) output.textContent = JSON.stringify(e.detail, null, 2);
      }}
    >
      <sgds-data-table-row>
        <sgds-data-table-head>#</sgds-data-table-head>
        <sgds-data-table-head>First name</sgds-data-table-head>
        <sgds-data-table-head>Last name</sgds-data-table-head>
        <sgds-data-table-head>Username</sgds-data-table-head>
      </sgds-data-table-row>
      <sgds-data-table-row>
        <sgds-data-table-cell>1</sgds-data-table-cell>
        <sgds-data-table-cell>John</sgds-data-table-cell>
        <sgds-data-table-cell>Doe</sgds-data-table-cell>
        <sgds-data-table-cell>@johndoe</sgds-data-table-cell>
      </sgds-data-table-row>
      <sgds-data-table-row>
        <sgds-data-table-cell>2</sgds-data-table-cell>
        <sgds-data-table-cell>Jane</sgds-data-table-cell>
        <sgds-data-table-cell>Doe</sgds-data-table-cell>
        <sgds-data-table-cell>@janedoe</sgds-data-table-cell>
      </sgds-data-table-row>
      <sgds-data-table-row>
        <sgds-data-table-cell>3</sgds-data-table-cell>
        <sgds-data-table-cell>Bob</sgds-data-table-cell>
        <sgds-data-table-cell>Smith</sgds-data-table-cell>
        <sgds-data-table-cell>@bobsmith</sgds-data-table-cell>
      </sgds-data-table-row>
      <sgds-data-table-row>
        <sgds-data-table-cell>4</sgds-data-table-cell>
        <sgds-data-table-cell>Amy</sgds-data-table-cell>
        <sgds-data-table-cell>Tan</sgds-data-table-cell>
        <sgds-data-table-cell>@amytan</sgds-data-table-cell>
      </sgds-data-table-row>
      <sgds-data-table-row>
        <sgds-data-table-cell>5</sgds-data-table-cell>
        <sgds-data-table-cell>Ben</sgds-data-table-cell>
        <sgds-data-table-cell>Ho</sgds-data-table-cell>
        <sgds-data-table-cell>@benho</sgds-data-table-cell>
      </sgds-data-table-row>
      <sgds-data-table-row>
        <sgds-data-table-cell>6</sgds-data-table-cell>
        <sgds-data-table-cell>Cara</sgds-data-table-cell>
        <sgds-data-table-cell>Lim</sgds-data-table-cell>
        <sgds-data-table-cell>@caralim</sgds-data-table-cell>
      </sgds-data-table-row>
    </sgds-data-table>
    <pre class="event-output sgds:mt-4 sgds:p-4 sgds:bg-alternate sgds:rounded-sm sgds:text-label-sm">
Check a row to see the sgds-row-select event detail</pre
    >
  </div>
`;

const MultiSelectPrecheckedOnLoadTemplate = () => html`
  <sgds-data-table currentPage="1" dataLength="3" itemsPerPage="5" multiSelect>
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>John</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@johndoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row checked>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Jane</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@janedoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Bob</sgds-data-table-cell>
      <sgds-data-table-cell>Smith</sgds-data-table-cell>
      <sgds-data-table-cell>@bobsmith</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const ExpandableRowsTemplate = () => html`
  <sgds-data-table currentPage="1" dataLength="3" itemsPerPage="5">
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row expand open>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>John</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@johndoe</sgds-data-table-cell>
      <div slot="content">
        <div class="sgds:rounded-sm">
          <sgds-table>
            <sgds-table-row>
              <sgds-table-head>Case ID</sgds-table-head>
              <sgds-table-head>Owner</sgds-table-head>
              <sgds-table-head>Category</sgds-table-head>
              <sgds-table-head>Amount</sgds-table-head>
              <sgds-table-head>Status</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row>
              <sgds-table-cell>OPS-2026-001</sgds-table-cell>
              <sgds-table-cell>Amy Tan</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="info" outlined>Operations</sgds-badge></sgds-table-cell>
              <sgds-table-cell>12,450.00</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="warning" outlined>Review</sgds-badge></sgds-table-cell>
            </sgds-table-row>

            <sgds-table-row>
              <sgds-table-cell>FIN-2026-014</sgds-table-cell>
              <sgds-table-cell>Ben Ho</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="purple" outlined>Finance</sgds-badge></sgds-table-cell>
              <sgds-table-cell>3,180.00</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="success" outlined>Approved</sgds-badge></sgds-table-cell>
            </sgds-table-row>

            <sgds-table-row>
              <sgds-table-cell>SEC-2026-007</sgds-table-cell>
              <sgds-table-cell>Cara Lim</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="danger" outlined>Security</sgds-badge></sgds-table-cell>
              <sgds-table-cell>28,900.00</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="danger" outlined>Escalated</sgds-badge></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </div>
      </div>
    </sgds-data-table-row>
    <sgds-data-table-row expand>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Jane</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@janedoe</sgds-data-table-cell>
      <div slot="content">
        <div class="sgds:rounded-sm">
          <sgds-table>
            <sgds-table-row>
              <sgds-table-head>Case ID</sgds-table-head>
              <sgds-table-head>Owner</sgds-table-head>
              <sgds-table-head>Category</sgds-table-head>
              <sgds-table-head>Amount</sgds-table-head>
              <sgds-table-head>Status</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row>
              <sgds-table-cell>OPS-2026-019</sgds-table-cell>
              <sgds-table-cell>Faye Low</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="info" outlined>Design</sgds-badge></sgds-table-cell>
              <sgds-table-cell>4,560.00</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="warning" outlined>In Review</sgds-badge></sgds-table-cell>
            </sgds-table-row>

            <sgds-table-row>
              <sgds-table-cell>OPS-2026-021</sgds-table-cell>
              <sgds-table-cell>Glen Neo</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="primary" outlined>Operations</sgds-badge></sgds-table-cell>
              <sgds-table-cell>2,330.00</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="success" outlined>Completed</sgds-badge></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </div>
      </div>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Bob</sgds-data-table-cell>
      <sgds-data-table-cell>Smith</sgds-data-table-cell>
      <sgds-data-table-cell>@bobsmith</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const ExpandableMultiSelectTemplate = () => html`
  <sgds-data-table currentPage="1" dataLength="3" itemsPerPage="5" multiSelect>
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row expand>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>John</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@johndoe</sgds-data-table-cell>
      <div slot="content">
        <div class="sgds:rounded-sm">Department: Engineering</div>
      </div>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Jane</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@janedoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Bob</sgds-data-table-cell>
      <sgds-data-table-cell>Smith</sgds-data-table-cell>
      <sgds-data-table-cell>@bobsmith</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const CustomPaginationSummaryTemplate = () => html`
  <sgds-data-table currentPage="1" dataLength="4" itemsPerPage="2" paginationSummary="Showing 2 out of 4 records">
    <sgds-data-table-row>
      <sgds-data-table-head>ID</sgds-data-table-head>
      <sgds-data-table-head>Name</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>Amy</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Ben</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Cara</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>4</sgds-data-table-cell>
      <sgds-data-table-cell>Dan</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const HeaderAndCellPropsTemplate = () => html`
  <sgds-data-table layout="fixed" currentPage="1" dataLength="4" itemsPerPage="4">
    <sgds-data-table-row>
      <sgds-data-table-head>ID</sgds-data-table-head>
      <sgds-data-table-head sorting sortKey="name">Name</sgds-data-table-head>
      <sgds-data-table-head>Role</sgds-data-table-head>
      <sgds-data-table-head sorting sortKey="score" textAlign="right">Score</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>Lina</sgds-data-table-cell>
      <sgds-data-table-cell>Engineer</sgds-data-table-cell>
      <sgds-data-table-cell>82</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Adam</sgds-data-table-cell>
      <sgds-data-table-cell>Engineer</sgds-data-table-cell>
      <sgds-data-table-cell>70</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Nora</sgds-data-table-cell>
      <sgds-data-table-cell>Manager</sgds-data-table-cell>
      <sgds-data-table-cell>85</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const DefaultSortTemplate = () => html`
  <sgds-data-table currentPage="1" dataLength="4" itemsPerPage="4">
    <sgds-data-table-row>
      <sgds-data-table-head sorting sortKey="id">ID</sgds-data-table-head>
      <sgds-data-table-head sorting sortKey="name" sortDirection="ascending">Name</sgds-data-table-head>
      <sgds-data-table-head>Role</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Alice</sgds-data-table-cell>
      <sgds-data-table-cell>Engineer</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>4</sgds-data-table-cell>
      <sgds-data-table-cell>Ben</sgds-data-table-cell>
      <sgds-data-table-cell>Analyst</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>Chloe</sgds-data-table-cell>
      <sgds-data-table-cell>Manager</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Darren</sgds-data-table-cell>
      <sgds-data-table-cell>Designer</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const SortingWithNoRowsTemplate = () => html`
  <sgds-data-table>
    <sgds-data-table-row>
      <sgds-data-table-head sorting sortKey="id">ID</sgds-data-table-head>
      <sgds-data-table-head sorting sortKey="name">Name</sgds-data-table-head>
      <sgds-data-table-head sorting sortKey="role">Role</sgds-data-table-head>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const HeaderAlignmentTemplate = () => html`
  <sgds-data-table dataLength="3" itemsPerPage="5" currentPage="1">
    <sgds-data-table-row>
      <sgds-data-table-head>ID</sgds-data-table-head>
      <sgds-data-table-head>Name</sgds-data-table-head>
      <sgds-data-table-head>Category</sgds-data-table-head>
      <sgds-data-table-head textAlign="right">Quantity</sgds-data-table-head>
      <sgds-data-table-head textAlign="right">Amount</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>Amy Tan</sgds-data-table-cell>
      <sgds-data-table-cell>Operations</sgds-data-table-cell>
      <sgds-data-table-cell>12</sgds-data-table-cell>
      <sgds-data-table-cell>125.00</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Ben Ho</sgds-data-table-cell>
      <sgds-data-table-cell>Finance</sgds-data-table-cell>
      <sgds-data-table-cell>5</sgds-data-table-cell>
      <sgds-data-table-cell>98.30</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Cara Lim</sgds-data-table-cell>
      <sgds-data-table-cell>Security</sgds-data-table-cell>
      <sgds-data-table-cell>28</sgds-data-table-cell>
      <sgds-data-table-cell>302.10</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const LoadingTemplate = () => html`
  <sgds-data-table loading currentPage="1" dataLength="3" itemsPerPage="5">
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>John</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@johndoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Jane</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@janedoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Bob</sgds-data-table-cell>
      <sgds-data-table-cell>Smith</sgds-data-table-cell>
      <sgds-data-table-cell>@bobsmith</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const LoadingExpandableTemplate = () => html`
  <sgds-data-table loading currentPage="1" dataLength="3" itemsPerPage="5">
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row expand open>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>John</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@johndoe</sgds-data-table-cell>
      <div slot="content">Department: Engineering</div>
    </sgds-data-table-row>
    <sgds-data-table-row expand>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Jane</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@janedoe</sgds-data-table-cell>
      <div slot="content">Department: Design</div>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Bob</sgds-data-table-cell>
      <sgds-data-table-cell>Smith</sgds-data-table-cell>
      <sgds-data-table-cell>@bobsmith</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const LoadingMultiSelectTemplate = () => html`
  <sgds-data-table loading currentPage="1" dataLength="3" itemsPerPage="5" multiSelect>
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>John</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@johndoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Jane</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@janedoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Bob</sgds-data-table-cell>
      <sgds-data-table-cell>Smith</sgds-data-table-cell>
      <sgds-data-table-cell>@bobsmith</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const ServerLoadingTemplate = () => html`
  <sgds-data-table mode="server" loading dataLength="50" itemsPerPage="10" currentPage="1">
    <sgds-data-table-row>
      <sgds-data-table-head>ID</sgds-data-table-head>
      <sgds-data-table-head>Name</sgds-data-table-head>
      <sgds-data-table-head textAlign="right">Amount</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>Citizen 1</sgds-data-table-cell>
      <sgds-data-table-cell>42</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const SortEventTemplate = () => html`
  <div class="event-demo">
    <sgds-data-table
      mode="server"
      serverSort
      currentPage="1"
      dataLength="3"
      itemsPerPage="5"
      @sgds-sort=${e => {
        const output = e.target.closest(".event-demo")?.querySelector(".event-output");
        if (output) output.textContent = JSON.stringify(e.detail, null, 2);
      }}
    >
      <sgds-data-table-row>
        <sgds-data-table-head sorting sortKey="id">ID</sgds-data-table-head>
        <sgds-data-table-head sorting sortKey="name">Name</sgds-data-table-head>
        <sgds-data-table-head sorting sortKey="role">Role</sgds-data-table-head>
      </sgds-data-table-row>
      <sgds-data-table-row>
        <sgds-data-table-cell>1</sgds-data-table-cell>
        <sgds-data-table-cell>Alice</sgds-data-table-cell>
        <sgds-data-table-cell>Engineer</sgds-data-table-cell>
      </sgds-data-table-row>
      <sgds-data-table-row>
        <sgds-data-table-cell>2</sgds-data-table-cell>
        <sgds-data-table-cell>Ben</sgds-data-table-cell>
        <sgds-data-table-cell>Analyst</sgds-data-table-cell>
      </sgds-data-table-row>
      <sgds-data-table-row>
        <sgds-data-table-cell>3</sgds-data-table-cell>
        <sgds-data-table-cell>Chloe</sgds-data-table-cell>
        <sgds-data-table-cell>Manager</sgds-data-table-cell>
      </sgds-data-table-row>
    </sgds-data-table>
    <pre
      class="event-output"
      style="margin-top: 1rem; padding: 1rem; background: var(--sgds-color-bg-neutral-subtle, #f5f5f5); border-radius: 4px; font-size: 0.875rem; min-height: 2.5rem;"
    >
Click a sort header to see the sgds-sort event detail</pre
    >
  </div>
`;

export const NoRows = {
  render: NoRowsTemplate.bind({}),
  name: "No rows",
  args: {},
  parameters: {}
};

export const CustomNoData = {
  render: CustomNoDataTemplate.bind({}),
  name: "Custom no-data slot",
  args: {},
  parameters: {}
};

export const MultiSelect = {
  render: MultiSelectTemplate.bind({}),
  name: "Multi-select",
  args: {},
  parameters: {}
};

export const MultiSelectRowSelectEvent = {
  render: MultiSelectRowSelectEventTemplate.bind({}),
  name: "Multi-select row select event",
  args: {},
  parameters: {}
};

export const MultiSelectPrecheckedOnLoad = {
  render: MultiSelectPrecheckedOnLoadTemplate.bind({}),
  name: "Multi-select pre-checked on load",
  args: {},
  parameters: {}
};

export const ExpandableRows = {
  render: ExpandableRowsTemplate.bind({}),
  name: "Expandable rows",
  args: {},
  parameters: {}
};

export const ExpandableMultiSelect = {
  render: ExpandableMultiSelectTemplate.bind({}),
  name: "Expandable with multi-select",
  args: {},
  parameters: {}
};

export const CustomPaginationSummary = {
  render: CustomPaginationSummaryTemplate.bind({}),
  name: "Custom pagination summary",
  args: {},
  parameters: {}
};

export const HeaderAndCellProps = {
  render: HeaderAndCellPropsTemplate.bind({}),
  name: "Header and cell props",
  args: {},
  parameters: {}
};

export const DefaultSort = {
  render: DefaultSortTemplate.bind({}),
  name: "Default sort",
  args: {},
  parameters: {}
};

export const SortingWithNoRows = {
  render: SortingWithNoRowsTemplate.bind({}),
  name: "Sorting with no rows",
  args: {},
  parameters: {}
};

export const HeaderTextAlignment = {
  render: HeaderAlignmentTemplate.bind({}),
  name: "Header text alignment",
  args: {},
  parameters: {}
};

export const Loading = {
  render: LoadingTemplate.bind({}),
  name: "Loading",
  args: {},
  parameters: {}
};

export const LoadingExpandable = {
  render: LoadingExpandableTemplate.bind({}),
  name: "Loading (expandable)",
  args: {},
  parameters: {}
};

export const LoadingMultiSelect = {
  render: LoadingMultiSelectTemplate.bind({}),
  name: "Loading (multi-select)",
  args: {},
  parameters: {}
};

export const ServerLoading = {
  render: ServerLoadingTemplate.bind({}),
  name: "Server loading",
  args: {},
  parameters: {}
};

export const SortEvent = {
  render: SortEventTemplate.bind({}),
  name: "Sort event (server mode)",
  args: {},
  parameters: {}
};
