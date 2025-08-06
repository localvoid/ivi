import { component, html } from "ivi";

const c = component(() => {
  return (v) => html`
    <a>
      <b>
        <c>
          <d class=${v.d1}/>
        </c>
        <c>
          ${v.c1}
          <d class=${v.d2}/>
        </c>
        <c>
          <d class=${v.d3}/>
          ${v.c2}
        </c>
      </b>
      <b>
        <c><d/></c>
        <c>${v.c1}</c>
        <c><d/></c>
      </b>
      ${v.f}
    </a>
  `;
});
