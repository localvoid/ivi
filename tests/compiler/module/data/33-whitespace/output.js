import { component, html } from "ivi";
import { _T, _hN, _t, EMPTY_ARRAY as _EMPTY_ARRAY } from "ivi";
import { dedupe as _dedupe } from "oveo";
const _TPL_ = __IVI_TPL__(_T(_dedupe(_hN(`<a> <!> </a>`)), 66, _EMPTY_ARRAY, _dedupe([1, 0]), _dedupe([0, 2])));
const c = component(() => {
	return (v) => _t(_TPL_, [v]);
});
