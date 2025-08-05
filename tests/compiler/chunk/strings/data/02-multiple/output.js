import { component, html } from "ivi";
import { _T, _hE, _t, EMPTY_ARRAY as _EMPTY_ARRAY } from "ivi";
import { dedupe as _dedupe } from "oveo";
const STRINGS = ["a", "b"];
const _TPL_ = _T(_dedupe(_hE("div")), 1, _dedupe([2]), _EMPTY_ARRAY, _EMPTY_ARRAY);
const c1 = component(() => {
	return (v) => _t(_TPL_, [v]);
});
const _TPL_2 = _T(_dedupe(_hE("div")), 1, _dedupe([514]), _EMPTY_ARRAY, _EMPTY_ARRAY);
const c2 = component(() => {
	return (v) => _t(_TPL_2, [v]);
});
