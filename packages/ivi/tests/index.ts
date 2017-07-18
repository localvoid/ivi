import "core-js";
import { use } from "chai";
import { matchDOMOps } from "./utils/dom";
use(matchDOMOps);

import "./vnode.spec";
import "./render.spec";
import "./sync.spec";
import "./lifecycle.spec";
import "./context.spec";
import "./component.spec";
import "./events.spec";
import "./augment.spec";
import "./keep-alive.spec";
