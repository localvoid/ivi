import { TrackByKey, key } from "ivi";

describe("Operations", () => {
  describe("Invalid children", () => {
    test(`TrackByKey should throw an exception when there are duplicated keys`, () => {
      expect(() => { TrackByKey([key(0, 0), key(0, 1)]); }).toThrowError("key");
    });
  });
});
