import { component, html } from "ivi";
import { _T, _hE, _t, EMPTY_ARRAY as _EMPTY_ARRAY } from "ivi";
import { hoist as _hoist, dedupe as _dedupe } from "oveo";
const _TPL_ = (void 0, "@ivi.tpl", _T(_dedupe(_hE("div")), 1, _dedupe([6]), _EMPTY_ARRAY, _EMPTY_ARRAY, ["a"]));
const c = component(() => {
	return (v) => _t(_TPL_, [_hoist(v)]);
});
