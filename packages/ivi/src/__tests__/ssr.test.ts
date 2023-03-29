import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { render, TFlags, _t, _T } from "../ssr.js";

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
            null,
            [
              _T(
                0,
                `<p`,
                `</p>`,
                null,
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
            null,
            [
              "a",
              _T(
                0,
                `<p`,
                `</p>`,
                null,
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
            null,
            [
              _T(
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
            null,
            [
              "a",
              _T(
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
            null,
            [
              _T(
                0,
                `<p`,
                `</p>`,
                null,
                null,
                null,
              ),
              _T(
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
            null,
            [
              _T(
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
              null,
              [
                _T(
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
              null,
              [
                0,
                _T(
                  0,
                  `<b`,
                  `</b>`,
                  null,
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
              null,
              [
                "a",
                _T(
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
});
