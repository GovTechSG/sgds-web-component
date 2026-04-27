# Details Blocks Reference

Detail cards for displaying detailed information and session data.

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/refs/heads/master/stories/blocks/details/`

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Application Details | `application-details.stories.js` | [application-details.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/refs/heads/master/stories/blocks/details/application-details.stories.js) | Application details card |
| Session Detail | `session-detail.stories.js` | [session-detail.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/refs/heads/master/stories/blocks/details/session-detail.stories.js) | Session information detail card |

## How to Use

Each block file is a JavaScript/TypeScript module exporting a Lit template. To fetch the raw template:

1. Use the URL from the table above
2. Look for the template function (e.g., `const DetailsTemplate = () => html\`...\``)
3. Extract the HTML markup from the template literal
4. Adapt the markup to your content

Copy the template structure, substitute your detail information, and it's ready to use.
