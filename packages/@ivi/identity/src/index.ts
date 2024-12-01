import { type VAny, type VComponent, component } from "ivi";

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

export const Identity: (props: IdentityProps) => VComponent<IdentityProps> = component<IdentityProps>(() => {
  var _prevKey: any;
  var _prevType = A;
  return ({ key, children }) => {
    if (_prevKey !== key) {
      _prevKey = key;
      _prevType = (_prevType === A) ? B : A;
    }
    return _prevType(children);
  };
});
