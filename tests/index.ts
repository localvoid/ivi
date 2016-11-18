import { DevModeFlags, setDevModeFlags } from "../src/common/dev_mode";

setDevModeFlags(DevModeFlags.DisableScreenOfDeath);

import "./equality.spec";
import "./dom.spec";
import "./vnode.spec";
import "./render.spec";
import "./sync.spec";
import "./lifecycle.spec";
import "./ref.spec";
import "./context.spec";
import "./events.spec";
import "./augment";
import "./scheduler.spec";
