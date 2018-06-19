import { VNode, Component, statefulComponent, statelessComponent } from "ivi";

export const Stateless = statelessComponent<VNode>(
  (child) => child,
);

export const Stateful = statefulComponent(class extends Component<VNode> {
  render() {
    return this.props;
  }
});
