import { use } from "chai";
import { matchSnapshot } from "chai-snapshot";
import "./snapshot.spec";
import "./query.spec";

use(matchSnapshot);
