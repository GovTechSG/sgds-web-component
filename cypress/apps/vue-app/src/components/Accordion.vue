<template>
	<sgds-accordion accordionclasses="mb-4">
		<sgds-accordion-item>
			<p class="m-0" slot="accordion-header">This is a solo accordion</p>
			<span slot="accordion-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit
				fuga distinctio? Eum.</span>
		</sgds-accordion-item>
	</sgds-accordion>
	<sgds-accordion>
		<sgds-accordion-item>
			<p class="m-0" slot="accordion-header">This is an accordion</p>
			<span slot="accordion-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit
				fuga distinctio? Eum.</span>
		</sgds-accordion-item>
		<sgds-accordion-item>
			<p class="m-0" slot="accordion-header">Accordion 1</p>
			<span slot="accordion-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit
				fuga distinctio? Eum.</span>
		</sgds-accordion-item>
		<sgds-accordion-item open="">
			<p class="m-0" slot="accordion-header">Accordion 2</p>
			<span slot="accordion-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit
				fuga distinctio? Eum.</span>
		</sgds-accordion-item>
		<sgds-accordion-item>
			<p class="m-0" slot="accordion-header">Accordion 3</p>
			<span slot="accordion-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit
				fuga distinctio? Eum.</span>
		</sgds-accordion-item>
	</sgds-accordion>
</template>
