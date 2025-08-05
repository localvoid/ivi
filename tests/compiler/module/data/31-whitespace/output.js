import { component, html } from "ivi";
import { _T, _hN, _t, EMPTY_ARRAY as _EMPTY_ARRAY } from "ivi";
import { dedupe as _dedupe } from "oveo";
const _TPL_ = (void 0, "@ivi.tpl", _T(_dedupe(_hN(`<a> </a>`)), 65, _EMPTY_ARRAY, _dedupe([0]), _EMPTY_ARRAY));
const c = component(() => {
	return (v) => _t(_TPL_, [v]);
});
