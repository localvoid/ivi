import { component, html } from "ivi";
import { _T, _hE, _t, EMPTY_ARRAY as _EMPTY_ARRAY } from "ivi";
import { dedupe as _dedupe } from "oveo";
const _TPL_ = __IVI_TPL__(_T(_dedupe(_hE("div")), 1, _dedupe([3]), _EMPTY_ARRAY, _EMPTY_ARRAY, ["a"]));
const c = component(() => {
	return (v) => _t(_TPL_, [v]);
});
