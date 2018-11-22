import { Events, Ref, Context, TrackByKey, key } from "ivi";

describe("Operations", () => {
  describe("Invalid children", () => {
    test(`Events should throw an exception when child node is TrackByKey`, () => {
      expect(() => { Events(null, TrackByKey([])); }).toThrowError("TrackByKey");
    });

    test(`Ref should throw an exception when child node is TrackByKey`, () => {
      expect(() => { Ref({ v: null }, TrackByKey([])); }).toThrowError("TrackByKey");
    });

    test(`Context should throw an exception when child node is TrackByKey`, () => {
      expect(() => { Context({}, TrackByKey([])); }).toThrowError("TrackByKey");
    });

    test(`TrackByKey should throw an exception when child node is TrackByKey`, () => {
      expect(() => { TrackByKey([key(0, TrackByKey([]))]); }).toThrowError("TrackByKey");
    });

    test(`TrackByKey should throw an exception when there are duplicated keys`, () => {
      expect(() => { TrackByKey([key(0, 0), key(0, 1)]); }).toThrowError("key");
    });
  });
});
