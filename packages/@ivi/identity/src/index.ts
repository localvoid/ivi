import type { VAny } from "ivi";
import { component } from "ivi";

export interface PortalEntry {
  v: VAny;
}

const _renderChildren = (children: VAny) => children;
const _identityComponent = () => _renderChildren;
const A = component<VAny>(_identityComponent);
const B = component<VAny>(_identityComponent);

export interface IdentityProps {
  readonly key: any;
  readonly children: VAny;
}

export const Identity = component<IdentityProps>(() => {
  let _prevKey: any;
  let _prevType = A;
  return ({ key, children }) => {
    if (_prevKey !== key) {
      _prevKey = key;
      _prevType = (_prevType === A) ? B : A;
    }
    return _prevType(children);
  };
});
