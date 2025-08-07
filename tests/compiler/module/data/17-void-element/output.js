import { component, html } from "ivi";
import { _T, _hN, _t, EMPTY_ARRAY as _EMPTY_ARRAY } from "ivi";
import { dedupe as _dedupe } from "oveo";
const _TPL_ = __IVI_TPL__(_T(_dedupe(_hN(`<a><audio><video><embed><input><param><source><track><area><base><link><meta><br><col><hr><img><wbr></a>`)), 1, _EMPTY_ARRAY, _EMPTY_ARRAY, _EMPTY_ARRAY));
const c = component(() => {
	return (v) => _t(_TPL_);
});
