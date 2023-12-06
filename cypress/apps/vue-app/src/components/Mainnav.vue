<template>
	<sgds-mainnav>
		<img width="130" src="https://www.designsystem.tech.gov.sg/assets/img/logo-sgds.svg" slot="brand">
		<sgds-mainnav-item>ArgsTable Controlled </sgds-mainnav-item>
		<sgds-mainnav-dropdown togglertext="Dropdown" close="default">
			<sgds-dropdown-item href="https://google.com">Item 1</sgds-dropdown-item>
			<sgds-dropdown-item href="#">Item 2</sgds-dropdown-item>
			<sgds-dropdown-item href="#">Item 3</sgds-dropdown-item>
		</sgds-mainnav-dropdown>
		<sgds-mainnav-item href="#">About</sgds-mainnav-item>
		<sgds-mainnav-item href="#" slot="end">Contact Us</sgds-mainnav-item>
		<sgds-button slot="end">Login</sgds-button>
	</sgds-mainnav>
</template>
