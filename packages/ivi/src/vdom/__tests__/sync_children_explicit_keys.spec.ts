import * as h from "ivi-html";
import { startRender, checkDOMOps } from "./utils";

test(`#1`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#2`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#3`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div()
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#4`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div(),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#5`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div(),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#6`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#7`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(999).c(999),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#8`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(999).c(999),
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#9`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(4).c(4),
          h.div().k(9).c(9),
          h.div().k(999).c(999),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#10`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(999).c(999),
          h.div().k(4).c(4),
          h.div().k(9).c(9),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#11`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(9).c(9),
          h.div().k(3).c(3),
          h.div().k(6).c(6),
          h.div().k(1).c(1),
          h.div().k(0).c(0),
          h.div().k(999).c(999),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#12`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(999).c(999),
          h.div().k(9).c(9),
          h.div().k(3).c(3),
          h.div().k(6).c(6),
          h.div().k(1).c(1),
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#13`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(999).c(999),
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#14`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(999).c(999),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#15`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(999).c(999),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#16`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#17`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#18`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(0).c(0),
          h.div().k(999).c(999),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#19`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#20`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
          h.div().k(0).c(0),
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#21`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(998).c(998),
          h.div().k(999).c(999),
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#22`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(998).c(998),
          h.div().k(1).c(1),
          h.div().k(999).c(999),
          h.div().k(2).c(2),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#23`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(998).c(998),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(999).c(999),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#24`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(998).c(998),
          h.div().k(1).c(1),
          h.div().k(999).c(999),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#25`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(0).c(0),
          h.div().k(999).c(999),
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#26`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(998).c(998),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(999).c(999),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#27`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(999).c(999),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#28`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#29`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#30`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(998).c(998),
          h.div().k(999).c(999),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#30`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(998).c(998),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(999).c(999),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#31`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(998).c(998),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
          h.div().k(999).c(999),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#32`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(999).c(999),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#33`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(999).c(999),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(998).c(998),
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
          h.div().k(999).c(999),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#34`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
        )
      );
      const v2 = (
        h.div().c(
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#35`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#36`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#37`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(3).c(3),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#38`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#39`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(3).c(3),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#40`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#41`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#42`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#43`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#44`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(3).c(3),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#45`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#46`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#47`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#48`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(4).c(4),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#49`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#50`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#51`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(5).c(5),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#52`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#53`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#54`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#55`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#56`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(4).c(4),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#57`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#58`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#59`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#60`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(4).c(4),
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#61`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(0).c(0),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#62`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#63`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(4).c(4),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#64`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(2).c(2),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#65`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(4).c(4),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#66`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(0).c(0),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#67`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#68`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(1).c(1),
          h.div().k(4).c(4),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#69`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(5).c(5),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(4).c(4),
          h.div().k(6).c(6),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#70`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(8).c(8),
          h.div().k(1).c(1),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(0).c(0),
          h.div().k(7).c(7),
          h.div().k(2).c(2),
          h.div().k(9).c(9),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#71`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(9).c(9),
          h.div().k(5).c(5),
          h.div().k(0).c(0),
          h.div().k(7).c(7),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(6).c(6),
          h.div().k(8).c(8),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#72`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#73`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(0).c(0),
          h.div().k(2).c(2),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#74`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(3).c(3),
          h.div().k(0).c(0),
          h.div().k(2).c(2),
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#75`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(3).c(3),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#76`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#77`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#78`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(5).c(5),
          h.div().k(4).c(4),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#79`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(5).c(5),
          h.div().k(4).c(4),
          h.div().k(3).c(3),
          h.div().k(6).c(6),
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#80`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(5).c(5),
          h.div().k(4).c(4),
          h.div().k(3).c(3),
          h.div().k(6).c(6),
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(0).c(0),
          h.div().k(7).c(7),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#81`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#82`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(0).c(0),
          h.div().k(1).c(1),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#83`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(7).c(7),
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(8).c(8),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(9).c(9),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(7).c(7),
          h.div().k(5).c(5),
          h.div().k(4).c(4),
          h.div().k(8).c(8),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#84`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(7).c(7),
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(8).c(8),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(9).c(9),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(5).c(5),
          h.div().k(4).c(4),
          h.div().k(8).c(8),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(0).c(0),
          h.div().k(9).c(9),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#85`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(7).c(7),
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(8).c(8),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(9).c(9),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(7).c(7),
          h.div().k(5).c(5),
          h.div().k(4).c(4),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(0).c(0),
          h.div().k(9).c(9),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#86`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(7).c(7),
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(8).c(8),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(9).c(9),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(5).c(5),
          h.div().k(4).c(4),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(0).c(0),
          h.div().k(9).c(9),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#87`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(7).c(7),
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(8).c(8),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
          h.div().k(9).c(9),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(5).c(5),
          h.div().k(4).c(4),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#88`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#89`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#90`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#91`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#92`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#93`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#94`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#95`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(8).c(8),
          h.div().k(9).c(9),
          h.div().k(10).c(10),
          h.div().k(11).c(11),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#96`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(6).c(6),
          h.div().k(1).c(1),
          h.div().k(7).c(7),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(8).c(8),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#97`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(3).c(3),
          h.div().k(8).c(8),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#98`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#99`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(3).c(3),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#100`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(0).c(0),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(1).c(1),
          h.div().k(3).c(3),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#101`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(0).c(0),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#102`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(6).c(6),
          h.div().k(1).c(1),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(4).c(4),
          h.div().k(7).c(7),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#103`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(6).c(6),
          h.div().k(1).c(1),
          h.div().k(7).c(7),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(4).c(4),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#104`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(4).c(4),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#105`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(2).c(2),
          h.div().k(3).c(3),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(6).c(6),
          h.div().k(1).c(1),
          h.div().k(7).c(7),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(4).c(4),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#106`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(
            h.div().k(0).c(0),
          ),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(0).c(0),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#107`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(
            h.div().k(0).c(0),
          ),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#108`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(0).c(
            h.div().k(0).c(0),
          ),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#109`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(
            h.div().k(0).c(0),
            h.div().k(1).c(1),
          ),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(1).c(
            h.div().k(1).c(1),
            h.div().k(0).c(0),
          ),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#110`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(
            h.div().k(0).c(0),
            h.div().k(1).c(1),
          ),
          h.div().k(2).c(2),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(2).c(2),
          h.div().k(1).c(
            h.div().k(1).c(1),
            h.div().k(0).c(0),
          ),
          h.div().k(3).c(3),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#111`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(
            h.div().k(0).c(0),
            h.div().k(1).c(1),
          ),
          h.div().k(2).c(
            h.div().k(0).c(0),
            h.div().k(1).c(1),
          ),
          h.div().k(0).c(0),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(1).c(
            h.div().k(1).c(1),
            h.div().k(0).c(0),
          ),
          h.div().k(2).c(
            h.div().k(1).c(1),
            h.div().k(0).c(0),
          ),
          h.div().k(3).c(3),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#112`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(1).c(
            h.div().k(0).c(0),
            h.div().k(1).c(1),
          ),
          h.div().k(2).c(2),
          h.div().k(0).c(0),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(3).c(3),
          h.div().k(2).c(
            h.div().k(1).c(1),
            h.div().k(0).c(0),
          ),
          h.div().k(1).c(1),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#113`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(2),
          h.div().k(3).c(
            h.div().k(1).c(1),
            h.div().k(0).c(0),
          ),
          h.div().k(4).c(4),
          h.div().k(5).c(5),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(6).c(6),
          h.div().k(1).c(
            h.div().k(0).c(0),
            h.div().k(1).c(1),
          ),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(4).c(4),
          h.div().k(7).c(7),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#114`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div().k(0).c(0),
          h.div().k(1).c(1),
          h.div().k(2).c(
            h.div().k(0).c(0),
          ),
          h.div().k(3).c(3),
          h.div().k(4).c(
            h.div().k(0).c(0),
          ),
          h.div().k(5).c(5),
        )
      );
      const v2 = (
        h.div().c(
          h.div().k(6).c(6),
          h.div().k(7).c(7),
          h.div().k(3).c(3),
          h.div().k(2).c(2),
          h.div().k(4).c(4),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});
