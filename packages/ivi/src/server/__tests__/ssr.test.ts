import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { render, TFlags, _P, _t, _T } from "../core.js";

describe("render to string", () => {
  test(`<div></div>`, () => {
    strictEqual(
      render(
        _t([
          _T(
            0,
            `<div`,
            `</div>`,
            null,
            null,
          ),
        ]),
      ),
      `<div></div>`
    );
  });

  test(`<div>a</div>`, () => {
    strictEqual(
      render(
        _t([
          _T(
            0,
            `<div`,
            `</div>`,
            null,
            [
              "a",
            ],
          ),
        ]),
      ),
      `<div>a</div>`
    );
  });

  test(`<div><p></p></div>`, () => {
    strictEqual(
      render(
        _t([
          _T(
            0,
            `<div`,
            `</div>`,
            null,
            [
              _T(
                0,
                `<p`,
                `</p>`,
                null,
                null,
              ),
            ],
          ),
        ]),
      ),
      `<div><p></p></div>`
    );
  });

  test(`<div>a<p></p></div>`, () => {
    strictEqual(
      render(
        _t([
          _T(
            0,
            `<div`,
            `</div>`,
            null,
            [
              "a",
              _T(
                0,
                `<p`,
                `</p>`,
                null,
                null,
              ),
            ],
          ),
        ]),
      ),
      `<div>a<p></p></div>`
    );
  });

  test(`<div><p></p>b</div>`, () => {
    strictEqual(
      render(
        _t([
          _T(
            0,
            `<div`,
            `</div>`,
            null,
            [
              _T(
                0,
                `<p`,
                `</p>`,
                null,
                null,
              ),
              "b",
            ],
          ),
        ]),
      ),
      `<div><p></p>b</div>`
    );
  });

  test(`<div>a<p></p>b</div>`, () => {
    strictEqual(
      render(
        _t([
          _T(
            0,
            `<div`,
            `</div>`,
            null,
            [
              "a",
              _T(
                0,
                `<p`,
                `</p>`,
                null,
                null,
              ),
              "b",
            ],
          ),
        ]),
      ),
      `<div>a<p></p>b</div>`
    );
  });

  test(`<div><p></p><b></b></div>`, () => {
    strictEqual(
      render(
        _t([
          _T(
            0,
            `<div`,
            `</div>`,
            null,
            [
              _T(
                0,
                `<p`,
                `</p>`,
                null,
                null,
              ),
              _T(
                0,
                `<b`,
                `</b>`,
                null,
                null,
              ),
            ],
          ),
        ]),
      ),
      `<div><p></p><b></b></div>`
    );
  });

  test(`<div><p>c</p></div>`, () => {
    strictEqual(
      render(
        _t([
          _T(
            0,
            `<div`,
            `</div>`,
            null,
            [
              _T(
                0,
                `<p`,
                `</p>`,
                null,
                [
                  "c"
                ],
              ),
            ],
          ),
        ]),
      ),
      `<div><p>c</p></div>`
    );
  });

  test(`<div>{"0"}</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              0,
              `<div`,
              `</div>`,
              null,
              [
                0,
              ],
            ),
          ],
          ["0"],
        ),
      ),
      `<div>0</div>`
    );
  });

  test(`<div>a{"0"}</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              0,
              `<div`,
              `</div>`,
              null,
              [
                "a",
                0,
              ],
            ),
          ],
          ["0"],
        ),
      ),
      `<div>a<!>0</div>`
    );
  });

  test(`<div>{"0"}b</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                0,
                "b",
              ],
            ),
          ],
          ["0"],
        ),
      ),
      `<div &="1">0<!>b</div>`
    );
  });

  test(`<div>a{"0"}b</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                "a",
                0,
                "b",
              ],
            ),
          ],
          ["0"],
        ),
      ),
      `<div &="1">a<!>0<!>b</div>`
    );
  });

  test(`<div><b></b>{"0"}</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              0,
              `<div`,
              `</div>`,
              null,
              [
                _T(
                  0,
                  `<b`,
                  `</b>`,
                  null,
                  null,
                ),
                0,
              ],
            ),
          ],
          ["0"],
        ),
      ),
      `<div><b></b>0</div>`
    );
  });

  test(`<div>{"0"}<b></b></div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                0,
                _T(
                  0,
                  `<b`,
                  `</b>`,
                  null,
                  null,
                ),
              ],
            ),
          ],
          ["0"],
        ),
      ),
      `<div &="1">0<b></b></div>`
    );
  });

  test(`<div>a<b></b>{"0"}</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              0,
              `<div`,
              `</div>`,
              null,
              [
                "a",
                _T(
                  0,
                  `<b`,
                  `</b>`,
                  null,
                  null,
                ),
                0,
              ],
            ),
          ],
          ["0"],
        ),
      ),
      `<div>a<b></b>0</div>`
    );
  });

  test(`<div>{"0"}{"1"}</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              0,
              `<div`,
              `</div>`,
              null,
              [
                0,
                1,
              ],
            ),
          ],
          ["0", "1"],
        ),
      ),
      `<div>0<!>1</div>`
    );
  });

  test(`<div>{"0"}{"1"}b</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                0,
                1,
                "b",
              ],
            ),
          ],
          ["0", "1"],
        ),
      ),
      `<div &="1 1">0<!>1<!>b</div>`
    );
  });

  test(`<div>{["0", "1"]}b</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                0,
                "b",
              ],
            ),
          ],
          [
            ["0", "1"],
          ],
        ),
      ),
      `<div &="2">0<!>1<!>b</div>`
    );
  });

  test(`<div>{["0", null]}b</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                0,
                "b",
              ],
            ),
          ],
          [
            ["0", null],
          ],
        ),
      ),
      `<div &="1">0<!>b</div>`
    );
  });

  test(`<div>{["0", undefined]}b</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                0,
                "b",
              ],
            ),
          ],
          [
            ["0", void 0],
          ],
        ),
      ),
      `<div &="1">0<!>b</div>`
    );
  });

  test(`<div>{["0", false]}b</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                0,
                "b",
              ],
            ),
          ],
          [
            ["0", false],
          ],
        ),
      ),
      `<div &="1">0<!>b</div>`
    );
  });

  test(`<div>{["0", <b></b>]}b</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                0,
                "b",
              ],
            ),
          ],
          [
            [
              "0",
              _t([_T(
                0,
                `<b`,
                `</b>`,
                null,
                null,
              )]),
            ],
          ],
        ),
      ),
      `<div &="2">0<b></b>b</div>`
    );
  });

  test(`<div>{["0", "1"]}{"2"}b</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                0,
                1,
                "b",
              ],
            ),
          ],
          [
            ["0", "1"],
            "2",
          ],
        ),
      ),
      `<div &="2 1">0<!>1<!>2<!>b</div>`
    );
  });

  test(`<div>{null}</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              0,
              `<div`,
              `</div>`,
              null,
              [
                0,
              ],
            ),
          ],
          [
            null,
          ],
        ),
      ),
      `<div></div>`
    );
  });

  test(`<div>{null}b</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                0,
                "b",
              ],
            ),
          ],
          [
            null,
          ],
        ),
      ),
      `<div &="0">b</div>`
    );
  });

  test(`<div>{undefined}</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              0,
              `<div`,
              `</div>`,
              null,
              [
                0,
              ],
            ),
          ],
          [
            void 0,
          ],
        ),
      ),
      `<div></div>`
    );
  });

  test(`<div>{undefined}b</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                0,
                "b",
              ],
            ),
          ],
          [
            void 0,
          ],
        ),
      ),
      `<div &="0">b</div>`
    );
  });

  test(`<div>{false}</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              0,
              `<div`,
              `</div>`,
              null,
              [
                0,
              ],
            ),
          ],
          [
            false,
          ],
        ),
      ),
      `<div></div>`
    );
  });

  test(`<div>{false}b</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                0,
                "b",
              ],
            ),
          ],
          [
            false,
          ],
        ),
      ),
      `<div &="0">b</div>`
    );
  });

  test(`<div a={"0"}></div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              0,
              `<div`,
              `</div>`,
              [
                _P(` a="`, 0),
              ],
              null,
            ),
          ],
          [
            "0",
          ],
        ),
      ),
      `<div a="0"></div>`
    );
  });

  test(`<div a={"0"} b={"1"}></div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              0,
              `<div`,
              `</div>`,
              [
                _P(` a="`, 0),
                _P(`" b="`, 1),
              ],
              null,
            ),
          ],
          [
            "0",
            "1",
          ],
        ),
      ),
      `<div a="0" b="1"></div>`
    );
  });

  test(`<div style="{a:0}"></div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              0,
              `<div`,
              `</div>`,
              [
                _P(` style="a:`, 0),
              ],
              null,
            ),
          ],
          [
            "0",
          ],
        ),
      ),
      `<div style="a:0"></div>`
    );
  });

  test(`<div style="{a:0,b:1}"></div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              0,
              `<div`,
              `</div>`,
              [
                _P(` style="a:`, 0),
                _P(`;b:`, 1),
              ],
              null,
            ),
          ],
          [
            "0",
            "1",
          ],
        ),
      ),
      `<div style="a:0;b:1"></div>`
    );
  });

  test(`<div>{["a",<b>{"1"}c</b>]}b</div>`, () => {
    strictEqual(
      render(
        _t(
          [
            _T(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              [
                0,
                "b",
              ],
            ),
          ],
          [
            [
              "0",
              _t(
                [
                  _T(
                    TFlags.GenerateOffsets,
                    `<b`,
                    `</b>`,
                    null,
                    [
                      0,
                      "c",
                    ],
                  ),
                ],
                ["1"],
              ),
            ],
          ],
        ),
      ),
      `<div &="2">0<b &="1">1<!>c</b>b</div>`
    );
  });

});
