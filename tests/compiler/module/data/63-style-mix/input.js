import { component, html } from "ivi";

const c = component(() => {
	return (v) => html`
	  <div
		  ~a="0"
			~a=${v}
			style="b:1"
			~c="2"
		/>`;
});
