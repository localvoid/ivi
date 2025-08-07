import { component, html } from "ivi";
import { _T, _hN, _t, EMPTY_ARRAY as _EMPTY_ARRAY } from "ivi";
import { dedupe as _dedupe } from "oveo";
const _TPL_ = __IVI_TPL__(_T(_dedupe(_hN(`<div style="a:0;b:1;c:2"></div>`)), 1, _dedupe([5]), _EMPTY_ARRAY, _EMPTY_ARRAY, ["a"]));
const c = component(() => {
	return (v) => _t(_TPL_, [v]);
});
