# About Web components

## The why

### Framework agnostic

SGDS chooses web components as the the sole form of technical distribution of the components in our design system since version 3. The decision stems from the fact that the frontend landscape is everchanging and new frameworks are popping up now and then, making it hard to keep up with the trend. Web components provide a future-proof solution as they are framework agnostic providing compatibility with modern popular frontend libraries like react\*\*, vue, angular etc or even just plain vanilla javascript. As long as the browser exists, web component can run! That way, we also have a single source of truth when it comes to constructing the styles and interactions of components.

### Style encapsulation

Another main feature of web components its the usage of a shadow DOM. The shadow DOM helps to prevent leakage of styles to the light DOM which resolves a common problem of style clashes, where one styling framework library clashes with same name CSS selectors with another styling framework library. With web components, the styles for each component are secured in the shadow DOM of each component and will not be affected with any CSS loaded from the light DOM. This is good news for developers who wish to use other styling framework like tailwind, chakra, bootstrap together with SGDS web components, or for teams who are looking to integrate new components into legacy applications without having to do a styling overhaul. 

### Growing community 

While web components might still sound foreign to some, it has some notable big users in the tech industry like <a href="https://levelup.gitconnected.com/web-components-at-big-tech-companies-youtube-84266bb507fd" target="_blank">Youtube</a>, Adobe on the browser, Microsoft etc. This is important as it means that eco-system surrounding web component will get better over the years and will be here to stay.  See which organisation are using web components <a href="https://arewebcomponentsathingyet.com/" target="_blank">here</a>

- <a href="https://eisenbergeffect.medium.com/2023-state-of-web-components-c8feb21d4f16" target="_blank">State of web components in 2023 </a>
- <a href="https://eisenbergeffect.medium.com/web-components-2024-winter-update-445f27e7613a" target="_blank">State of web components in 2024 </a>

## The how

SGDS web components is built with Google's Lit 3 library.

## Addressing the concerns 

The rise of popularity in SSR frameworks is in our radar and we acknowledge the limitations of web components with server side rendering. Below we will address each cons and how we help to relieve some of the pain points of web components in SSR framework.

### Server-side compatibility

#### Client only

Web components requires the browser to run and are best to be client rendered only at this point of writing. However, likewise with other frontend component libraries, react-bootstrap / next-ui, these components are client side rendered too because they require javascript to run. For example, the "use client" directive is added in every component of next-ui library. 

Since version 2.1.0 of our library, we have also supported the addition "use client" directive for our react-wrapped web components, to ensure a smoother user experience.

Nevertheless, the Declarative shadow DOM, a standard web platform feature to support shadow DOM in the server, has recently been shipped in all major browser as of 2024.
There are <a href="https://lit.dev/docs/ssr/overview/" target="_blank">helper plugin libraries surrounding Lit's eco-system</a> to help support server rendering for web components.

We are monitoring and evaluating these libraries to help recommend a solution for server rendering our web components in the future. 

Read more about the <a href="https://web.dev/articles/declarative-shadow-dom" target="_blank">declarative shadow dom </a>.     

#### Search Engine Optimisation

Its a myth in 2024 that search engine crawlers like Google and Bing cannot unravel a javascript application. They can , and this means client side rendering does not mean poor SEO! That said, one may argue that it is faster for search engine crawlers to index a pre-rendered HTML page from the SSR apps without running javascript.

As such while constructing our web components, we keep it in mind to make SEO critical information to be part of the light DOM. SEO critical information are usually the textual content you would want to appear in the search engine searches.


We do it by first separating our SEO critical components from non-SEO critical components (because why would one need a progress bar or a spinner or a datepicker to be crawled?)

| SEO critical     | non-SEO critical |   
| ---------------- | ---------------- |
| Accordion        | Action Card      |  
| Breadcrumb       | Alert            |   
| Button           | Badge            |   
| Card             | Checkbox         |   
| Drawer           | Combobox         |    
| Dropdown         | Datepicker       |   
| Footer           | Divider          |   
| IconList         | FileUpload       |
| Link             | IconButton       |    
| Main navigtation | Input            |    
| Pagination       | Masthead         |    
| Side navigation  | Modal            |    
| Tab              | Progress         |     
| Table            | Quantity Toggle  |    
|                  | Radio            |     
|                  | Skeleton         | 
|                  | Spinner          |     
|                  | Stepper          |     
|                  | Switch           |     
|                  | Tooltip          |     


Next, we ensure that the textual content or SEO critical content like search anchor tags to be written part of the slots that is available in the light DOM.
HTML content rendered from the light DOM are available in the HTML that is pre-rendered from the server. 
As a developer user, it is also important to be mindful of using the right HTML tags for SEO.  
For example, using an anchor tag for links, header tags for header contents. 

<img href="./static/seo.png" />

Readings 
- https://dev.to/stuffbreaker/seo-and-web-components-2023-edition-3l6i
- https://eisenbergeffect.medium.com/debunking-web-component-myths-and-misconceptions-ea9bb13daf61#:~:text=Web%20Components%20can%20be%20SEO%20friendly.

