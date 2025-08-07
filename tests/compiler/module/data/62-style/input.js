import { component, html } from "ivi";

const c = component(() => {
	return (v) => html`
	  <div
		  ~a="0"
			style="b:1"
			~c="2"
		/>`;
});
