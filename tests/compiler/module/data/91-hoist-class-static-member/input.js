import { component, html } from "ivi";
import * as s from "css";

const c = component(() => {
	return (v) => html`<div class=${s.cls}/>`;
});