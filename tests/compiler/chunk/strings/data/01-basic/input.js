import { component, html } from "ivi";

const STRINGS = (void 0, "@ivi.strings", []);

const c = component(() => {
	return (v) => html`<div a=${v}/>`;
});