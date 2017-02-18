import { IVNode } from "../../../src/vdom/ivnode";
import { Component } from "../../../src/vdom/component";
import { VNode, $c } from "../../../src/vdom/vnode";

export interface UpdateContextComponentProps {
    context: () => { [key: string]: any } | undefined;
    child: IVNode<any>;
}

export class UpdateContextComponent extends Component<UpdateContextComponentProps> {
    updateContext() {
        return this.props.context();
    }

    render() {
        return this.props.child;
    }
}

export function $ctx(context: () => { [key: string]: any }, c: IVNode<any>): VNode<UpdateContextComponentProps> {
    return $c(UpdateContextComponent, {
        child: c,
        context: context,
    });
}
