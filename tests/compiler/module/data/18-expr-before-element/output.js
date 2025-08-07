import { component, html } from "ivi";
import { _T, _hN, _t } from "ivi";
import { dedupe as _dedupe } from "oveo";
const _TPL_ = __IVI_TPL__(_T(_dedupe(_hN(`<a><b></b></a>`)), 66, _dedupe([1]), _dedupe([5, 4]), _dedupe([1])));
const c = component(() => {
	return (v) => _t(_TPL_, [v.a, v.b]);
});
