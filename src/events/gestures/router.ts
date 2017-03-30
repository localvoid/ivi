import { GesturePointerEvent } from "./pointer_event";

export type PointerRoute = (ev: GesturePointerEvent) => void;

export class PointerRouter {
    private routeMap: Map<number, PointerRoute[]>;

    constructor() {
        this.routeMap = new Map<number, PointerRoute[]>();
    }

    addRoute(pointerId: number, route: PointerRoute): void {
        let routes = this.routeMap.get(pointerId);
        if (routes === undefined) {
            routes = [];
            this.routeMap.set(pointerId, routes);
        }
        routes.push(route);
    }

    removeRoute(pointerId: number, route: PointerRoute): void {
        const routes = this.routeMap.get(pointerId)!;
        if (routes.length === 1) {
            this.routeMap.delete(pointerId);
        } else {
            routes.splice(routes.indexOf(route), 1);
        }
    }

    dispatch(ev: GesturePointerEvent) {
        const pointerId = ev.id;
        const routes = this.routeMap.get(pointerId);
        if (routes !== undefined) {
            const routesCopy = routes.slice();
            for (let i = 0; i < routesCopy.length; i++) {
                routesCopy[i](ev);
            }
        }
    }
}
