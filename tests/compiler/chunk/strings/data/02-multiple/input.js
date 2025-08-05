import { component, html } from "ivi";

const STRINGS = (void 0, "@ivi.strings", []);

const c1 = component(() => {
	return (v) => html`<div a=${v}/>`;
});

const c2 = component(() => {
	return (v) => html`<div b=${v}/>`;
});