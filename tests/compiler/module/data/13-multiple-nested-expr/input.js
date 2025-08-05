import { component, html } from "ivi";

const c = component(() => {
	return (v) => html`
	  <div>
		  <span>${v.a}</span>
			<span>${v.b}</span>
		</div>`;
});