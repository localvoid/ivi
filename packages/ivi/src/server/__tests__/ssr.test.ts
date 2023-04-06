import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { TFlags } from "../template.js";
import { renderToString, _$T, _$P, _$S, _$t, _$E } from "../core.js";

describe("render to string", () => {
  test(`<div></div>`, () => {
    strictEqual(
      renderToString(
        _$t(_$T([
          _$E(
            0,
            `<div`,
            `</div>`,
            null,
            null,
            null,
          ),
        ])),
      ),
      `<div></div>`
    );
  });

  test(`<div>a</div>`, () => {
    strictEqual(
      renderToString(
        _$t(_$T([
          _$E(
            0,
            `<div`,
            `</div>`,
            null,
            null,
            [
              "a",
            ],
          ),
        ])),
      ),
      `<div>a</div>`
    );
  });

  test(`<div><p></p></div>`, () => {
    strictEqual(
      renderToString(
        _$t(_$T([
          _$E(
            0,
            `<div`,
            `</div>`,
            null,
            null,
            [
              _$E(
                0,
                `<p`,
                `</p>`,
                null,
                null,
                null,
              ),
            ],
          ),
        ])),
      ),
      `<div><p></p></div>`
    );
  });

  test(`<div>a<p></p></div>`, () => {
    strictEqual(
      renderToString(
        _$t(_$T([
          _$E(
            0,
            `<div`,
            `</div>`,
            null,
            null,
            [
              "a",
              _$E(
                0,
                `<p`,
                `</p>`,
                null,
                null,
                null,
              ),
            ],
          ),
        ])),
      ),
      `<div>a<p></p></div>`
    );
  });

  test(`<div><p></p>b</div>`, () => {
    strictEqual(
      renderToString(
        _$t(_$T([
          _$E(
            0,
            `<div`,
            `</div>`,
            null,
            null,
            [
              _$E(
                0,
                `<p`,
                `</p>`,
                null,
                null,
                null,
              ),
              "b",
            ],
          ),
        ])),
      ),
      `<div><p></p>b</div>`
    );
  });

  test(`<div>a<p></p>b</div>`, () => {
    strictEqual(
      renderToString(
        _$t(_$T([
          _$E(
            0,
            `<div`,
            `</div>`,
            null,
            null,
            [
              "a",
              _$E(
                0,
                `<p`,
                `</p>`,
                null,
                null,
                null,
              ),
              "b",
            ],
          ),
        ])),
      ),
      `<div>a<p></p>b</div>`
    );
  });

  test(`<div><p></p><b></b></div>`, () => {
    strictEqual(
      renderToString(
        _$t(_$T([
          _$E(
            0,
            `<div`,
            `</div>`,
            null,
            null,
            [
              _$E(
                0,
                `<p`,
                `</p>`,
                null,
                null,
                null,
              ),
              _$E(
                0,
                `<b`,
                `</b>`,
                null,
                null,
                null,
              ),
            ],
          ),
        ])),
      ),
      `<div><p></p><b></b></div>`
    );
  });

  test(`<div><p>c</p></div>`, () => {
    strictEqual(
      renderToString(
        _$t(_$T([
          _$E(
            0,
            `<div`,
            `</div>`,
            null,
            null,
            [
              _$E(
                0,
                `<p`,
                `</p>`,
                null,
                null,
                [
                  "c"
                ],
              ),
            ],
          ),
        ])),
      ),
      `<div><p>c</p></div>`
    );
  });

  test(`<div>{"0"}</div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
              ],
            ),
          ]),
          ["0"],
        ),
      ),
      `<div>0</div>`
    );
  });

  test(`<div>a{"0"}</div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              null,
              null,
              [
                "a",
                0,
              ],
            ),
          ]),
          ["0"],
        ),
      ),
      `<div>a<!>0</div>`
    );
  });

  test(`<div>{"0"}b</div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                "b",
              ],
            ),
          ]),
          ["0"],
        ),
      ),
      `<div &="1">0<!>b</div>`
    );
  });

  test(`<div>a{"0"}b</div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                "a",
                0,
                "b",
              ],
            ),
          ]),
          ["0"],
        ),
      ),
      `<div &="1">a<!>0<!>b</div>`
    );
  });

  test(`<div><b></b>{"0"}</div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              null,
              null,
              [
                _$E(
                  0,
                  `<b`,
                  `</b>`,
                  null,
                  null,
                  null,
                ),
                0,
              ],
            ),
          ]),
          ["0"],
        ),
      ),
      `<div><b></b>0</div>`
    );
  });

  test(`<div>{"0"}<b></b></div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                _$E(
                  0,
                  `<b`,
                  `</b>`,
                  null,
                  null,
                  null,
                ),
              ],
            ),
          ]),
          ["0"],
        ),
      ),
      `<div &="1">0<b></b></div>`
    );
  });

  test(`<div>a<b></b>{"0"}</div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              null,
              null,
              [
                "a",
                _$E(
                  0,
                  `<b`,
                  `</b>`,
                  null,
                  null,
                  null,
                ),
                0,
              ],
            ),
          ]),
          ["0"],
        ),
      ),
      `<div>a<b></b>0</div>`
    );
  });

  test(`<div>{"0"}{"1"}</div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                1,
              ],
            ),
          ]),
          ["0", "1"],
        ),
      ),
      `<div>0<!>1</div>`
    );
  });

  test(`<div>{"0"}{"1"}b</div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                1,
                "b",
              ],
            ),
          ]),
          ["0", "1"],
        ),
      ),
      `<div &="2">0<!>1<!>b</div>`
    );
  });

  test(`<div>{["0", "1"]}b</div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                "b",
              ],
            ),
          ]),
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
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                "b",
              ],
            ),
          ]),
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
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                "b",
              ],
            ),
          ]),
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
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                "b",
              ],
            ),
          ]),
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
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                "b",
              ],
            ),
          ]),
          [
            [
              "0",
              _$t(_$T([_$E(
                0,
                `<b`,
                `</b>`,
                null,
                null,
                null,
              )])),
            ],
          ],
        ),
      ),
      `<div &="2">0<b></b>b</div>`
    );
  });

  test(`<div>{["0", "1"]}{"2"}b</div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                1,
                "b",
              ],
            ),
          ]),
          [
            ["0", "1"],
            "2",
          ],
        ),
      ),
      `<div &="3">0<!>1<!>2<!>b</div>`
    );
  });

  test(`<div>{null}</div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
              ],
            ),
          ]),
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
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                "b",
              ],
            ),
          ]),
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
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
              ],
            ),
          ]),
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
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                "b",
              ],
            ),
          ]),
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
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
              ],
            ),
          ]),
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
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                "b",
              ],
            ),
          ]),
          [
            false,
          ],
        ),
      ),
      `<div &="0">b</div>`
    );
  });

  test(`<div a={undefined}></div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              [
                _$P(` a`, 0, 0),
              ],
              null,
              null,
            ),
          ]),
          [
            void 0,
          ],
        ),
      ),
      `<div></div>`
    );
  });

  test(`<div a={"0"}></div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              [
                _$P(` a`, 0, 0),
              ],
              null,
              null,
            ),
          ]),
          [
            "0",
          ],
        ),
      ),
      `<div a="0"></div>`
    );
  });

  test(`<div a={""}></div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              [
                _$P(` a`, 0, 0),
              ],
              null,
              null,
            ),
          ]),
          [
            "",
          ],
        ),
      ),
      `<div a></div>`
    );
  });

  test(`<div a={"0"} b={"1"}></div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              [
                _$P(` a`, 0, 0),
                _$P(` b`, 0, 1),
              ],
              null,
              null,
            ),
          ]),
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
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              null,
              _$S(
                "",
                [_$P(`a:`, 0, 0)],
              ),
              null,
            ),
          ]),
          [
            "0",
          ],
        ),
      ),
      `<div style="a:0;"></div>`
    );
  });

  test(`<div style="{a:0,b:1}"></div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<div`,
              `</div>`,
              null,
              _$S(
                "",
                [
                  _$P(`a:`, 0, 0),
                  _$P(`b:`, 0, 1),
                ],
              ),
              null,
            ),
          ]),
          [
            "0",
            "1",
          ],
        ),
      ),
      `<div style="a:0;b:1;"></div>`
    );
  });

  test(`<div>{["a",<b>{"1"}c</b>]}b</div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.GenerateOffsets,
              `<div`,
              `</div>`,
              null,
              null,
              [
                0,
                "b",
              ],
            ),
          ]),
          [
            [
              "0",
              _$t(
                _$T([
                  _$E(
                    TFlags.GenerateOffsets,
                    `<b`,
                    `</b>`,
                    null,
                    null,
                    [
                      0,
                      "c",
                    ],
                  ),
                ]),
                ["1"],
              ),
            ],
          ],
        ),
      ),
      `<div &="2">0<b &="1">1<!>c</b>b</div>`
    );
  });

  test(`<textarea .value={undefined}></div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.EscapeInnerHTML,
              `<textarea`,
              `</textarea>`,
              null,
              null,
              0,
            ),
          ]),
          [
            void 0,
          ],
        ),
      ),
      `<textarea></textarea>`
    );
  });

  test(`<textarea .value={false}></div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.EscapeInnerHTML,
              `<textarea`,
              `</textarea>`,
              null,
              null,
              0,
            ),
          ]),
          [
            false,
          ],
        ),
      ),
      `<textarea></textarea>`
    );
  });

  test(`<textarea .value={""}></div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.EscapeInnerHTML,
              `<textarea`,
              `</textarea>`,
              null,
              null,
              0,
            ),
          ]),
          [
            "",
          ],
        ),
      ),
      `<textarea></textarea>`
    );
  });

  test(`<textarea .value={"<text>"}></div>`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              TFlags.EscapeInnerHTML,
              `<textarea`,
              `</textarea>`,
              null,
              null,
              0,
            ),
          ]),
          [
            "<text>",
          ],
        ),
      ),
      `<textarea>&lt;text></textarea>`
    );
  });

  test(`<input *value={undefined} />`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<input`,
              ``,
              [
                _$P(` value`, 0, 0),
              ],
              null,
              null,
            ),
          ]),
          [
            void 0,
          ],
        ),
      ),
      `<input>`
    );
  });

  test(`<input *value={false} />`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<input`,
              ``,
              [
                _$P(` value`, TFlags.IgnoreEmptyString, 0),
              ],
              null,
              null,
            ),
          ]),
          [
            false,
          ],
        ),
      ),
      `<input>`
    );
  });

  test(`<input *value={""} />`, () => {
    strictEqual(
      renderToString(
        _$t(
          _$T([
            _$E(
              0,
              `<input`,
              ``,
              [
                _$P(` value`, TFlags.IgnoreEmptyString, 0),
              ],
              null,
              null,
            ),
          ]),
          [
            "",
          ],
        ),
      ),
      `<input>`
    );
  });
});
