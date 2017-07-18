import { createSnapshotRenderer } from "../src/snapshot";
import * as h from "ivi-html";
import { expect } from "chai";

describe("default renderer", () => {
  const render = createSnapshotRenderer();

  it("'abc'", () => {
    expect(render(h.t("abc"))).to.matchSnapshot();
  });

  it("<div>", () => {
    expect(render(h.div())).to.matchSnapshot();
  });

  it("<span>", () => {
    expect(render(h.span())).to.matchSnapshot();
  });

  it("<div> (null props)", () => {
    expect(render(h.div().props(null))).to.matchSnapshot();
  });

  it("<div> ({} props)", () => {
    expect(render(h.div().props({}))).to.matchSnapshot();
  });

  it("<div tabIndex='1'>", () => {
    expect(render(h.div().props({ tabIndex: 1 }))).to.matchSnapshot();
  });

  it("<div tabIndex='1' title='2'>", () => {
    expect(render(h.div().props({ tabIndex: 1, title: "2" }))).to.matchSnapshot();
  });

  it("<div data-abc='a'", () => {
    expect(render(h.div().props({ "data-abc": "a" }))).to.matchSnapshot();
  });

  it("<div aria-type='button'", () => {
    expect(render(h.div().props({ "aria-type": "button" }))).to.matchSnapshot();
  });

  it("<div class=null>", () => {
    expect(render(h.div().className(null))).to.matchSnapshot();
  });

  it("<div class=''>", () => {
    expect(render(h.div(""))).to.matchSnapshot();
  });

  it("<div class='a'>", () => {
    expect(render(h.div("a"))).to.matchSnapshot();
  });

  it("<div class='a b'>", () => {
    expect(render(h.div("a b"))).to.matchSnapshot();
  });

  it("<div style=null>", () => {
    expect(render(h.div().style(null))).to.matchSnapshot();
  });

  it("<div style={top: 10px}>", () => {
    expect(render(h.div().style({ top: "10px" }))).to.matchSnapshot();
  });

  it("<div style={float: 'left'}>", () => {
    expect(render(h.div().style({ float: "left" }))).to.matchSnapshot();
  });

  it("<div style={top: 10px; left: 20px}>", () => {
    expect(render(h.div().style({ top: "10px", left: "20px" }))).to.matchSnapshot();
  });

  it("<div></div> (null children)", () => {
    expect(render(h.div().children(null))).to.matchSnapshot();
  });

  it("<div>'abc'</div>", () => {
    expect(render(h.div().children("abc"))).to.matchSnapshot();
  });

  it("<div>10</div>", () => {
    expect(render(h.div().children(10))).to.matchSnapshot();
  });

  it("<div><span></div>", () => {
    expect(render(h.div().children(h.span()))).to.matchSnapshot();
  });

  it("<div>[]</div>", () => {
    expect(render(h.div().children([]))).to.matchSnapshot();
  });

  it("<div>[<span>]</div>", () => {
    expect(render(h.div().children(h.span()))).to.matchSnapshot();
  });

  it("<div>[<span>, <strong>]</div>", () => {
    expect(render(h.div().children(h.span(), h.strong()))).to.matchSnapshot();
  });

  it("<div>[" +
    "  <div>'hello'</div>," +
    "  <div>[<span>'world'</span>, <div><span></div>]</div>," +
    "  <div><div></div>," +
    "  <div>" +
    "]</div>", () => {
      expect(render(h.div().children(
        h.div().children("hello"),
        h.div().children(h.span().children("world"), h.div().children(h.span())),
        h.div().children(h.div()),
        h.div(),
      ))).to.matchSnapshot();
    });

  describe("svg", () => {
    it("<circle>", () => {
      expect(render(h.circle())).to.matchSnapshot();
    });

    it("<circle class='a'>", () => {
      expect(render(h.circle("a"))).to.matchSnapshot();
    });

    it("<circle style={top: 10px}>", () => {
      expect(render(h.circle().style({ top: "10px" }))).to.matchSnapshot();
    });

    it("<circle xlink:href='a'>", () => {
      expect(render(h.circle().props({ "xlink:href": "a" }))).to.matchSnapshot();
    });

    it("<circle xml:text='a'>", () => {
      expect(render(h.circle().props({ "xml:test": "a" }))).to.matchSnapshot();
    });
  });

  describe("special elements", () => {
    it("<input type='text'>", () => {
      expect(render(h.inputText())).to.matchSnapshot();
    });

    it("<input type='text' value='abc'>", () => {
      expect(render(h.inputText().value("abc"))).to.matchSnapshot();
    });

    it("<input type='checkbox'>", () => {
      expect(render(h.inputCheckbox())).to.matchSnapshot();
    });

    it("<input type='checkbox' checked='true'>", () => {
      expect(render(h.inputCheckbox().checked(true))).to.matchSnapshot();
    });

    it("<textarea>", () => {
      expect(render(h.textarea())).to.matchSnapshot();
    });

    it("<textarea>abc</textarea>", () => {
      expect(render(h.textarea().value("abc"))).to.matchSnapshot();
    });

    it("<audio>", () => {
      expect(render(h.audio())).to.matchSnapshot();
    });

    it("<audio volume=0.5>", () => {
      expect(render(h.audio().props({ volume: 0.5 }))).to.matchSnapshot();
    });

    it("<video volume=0.5>", () => {
      expect(render(h.video().props({ volume: 0.5 }))).to.matchSnapshot();
    });
  });
});
