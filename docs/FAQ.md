# FAQ page

<br/>

<sgds-faq-grid>
<div>
<h3> General </h3>

<sgds-accordion-item>
    <div slot="header">Uncaught DOMException: Failed to execute 'define' on 'CustomElementRegistry': Uncaught DOMException: Failed to execute 'define' on 'CustomElementRegistry'</div>
    <span slot="content">If you encounter this error, it means that you have imported a component of the same custom element tag name more than once. This may happen when you have installed multiple version of this library. It is not advisable to have more than one version of the component existing in the same application</span> 
</sgds-accordion-item>

<h3> React </h3>
<sgds-accordion-item >
    <div slot="header">Can I use web components with react?</div>
    <span slot="content">Yes you can! Our library offers a react wrapped version for each of our web component. This helps to provide 100% compatibility with react. <a target="_self" href="/docs/frameworks-react--docs">Learn more</a></span> 
</sgds-accordion-item>
</div>

<div>
    <sgds-card class="faq">
        <span slot="title">Github Issues</span>
        <p slot="description">Head to GitHub to view or open a new issue</p>    
        <a slot="link" href="https://github.com/GovTechSG/sgds-web-component/issues" target="_blank">Learn more</a>
    </sgds-card>
</div>
</sgds-faq-grid>
