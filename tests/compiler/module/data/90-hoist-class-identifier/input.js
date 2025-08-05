import { component, html } from "ivi";
import { cls } from "css";

const c = component(() => {
	return (v) => html`<div class=${cls}/>`;
});