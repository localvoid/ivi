import { component, html } from "ivi";

const STRINGS = ["IVI:fa7327d9-0034-492d-bfdf-576548b2d9cc"];

const c = component(() => {
	return (v) => html`<div a=${v}/>`;
});