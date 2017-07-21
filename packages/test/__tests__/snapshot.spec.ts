import { virtualRender as render } from "../src/vdom";
import * as h from "ivi-html";
import { expect } from "chai";

describe("default renderer", () => {
  it("'abc'", () => {
    expect(render(h.t("abc")).toSnapshot()).to.matchSnapshot();
  });

  it("<div>", () => {
    expect(render(h.div()).toSnapshot()).to.matchSnapshot();
  });

  it("<span>", () => {
    expect(render(h.span()).toSnapshot()).to.matchSnapshot();
  });

  it("<div> (null props)", () => {
    expect(render(h.div().props(null)).toSnapshot()).to.matchSnapshot();
  });

  it("<div> ({} props)", () => {
    expect(render(h.div().props({})).toSnapshot()).to.matchSnapshot();
  });

  it("<div tabIndex='1'>", () => {
    expect(render(h.div().props({ tabIndex: 1 })).toSnapshot()).to.matchSnapshot();
  });

  it("<div tabIndex='1' title='2'>", () => {
    expect(render(h.div().props({ tabIndex: 1, title: "2" })).toSnapshot()).to.matchSnapshot();
  });

  it("<div data-abc='a'", () => {
    expect(render(h.div().props({ "data-abc": "a" })).toSnapshot()).to.matchSnapshot();
  });

  it("<div aria-type='button'", () => {
    expect(render(h.div().props({ "aria-type": "button" })).toSnapshot()).to.matchSnapshot();
  });

  it("<div class=null>", () => {
    expect(render(h.div().className(null)).toSnapshot()).to.matchSnapshot();
  });

  it("<div class=''>", () => {
    expect(render(h.div("")).toSnapshot()).to.matchSnapshot();
  });

  it("<div class='a'>", () => {
    expect(render(h.div("a")).toSnapshot()).to.matchSnapshot();
  });

  it("<div class='a b'>", () => {
    expect(render(h.div("a b")).toSnapshot()).to.matchSnapshot();
  });

  it("<div style=null>", () => {
    expect(render(h.div().style(null)).toSnapshot()).to.matchSnapshot();
  });

  it("<div style={top: 10px}>", () => {
    expect(render(h.div().style({ top: "10px" })).toSnapshot()).to.matchSnapshot();
  });

  it("<div style={float: 'left'}>", () => {
    expect(render(h.div().style({ float: "left" })).toSnapshot()).to.matchSnapshot();
  });

  it("<div style={top: 10px; left: 20px}>", () => {
    expect(render(h.div().style({ top: "10px", left: "20px" })).toSnapshot()).to.matchSnapshot();
  });

  it("<div></div> (null children)", () => {
    expect(render(h.div().children(null)).toSnapshot()).to.matchSnapshot();
  });

  it("<div>'abc'</div>", () => {
    expect(render(h.div().children("abc")).toSnapshot()).to.matchSnapshot();
  });

  it("<div>10</div>", () => {
    expect(render(h.div().children(10)).toSnapshot()).to.matchSnapshot();
  });

  it("<div><span></div>", () => {
    expect(render(h.div().children(h.span())).toSnapshot()).to.matchSnapshot();
  });

  it("<div>[]</div>", () => {
    expect(render(h.div().children([])).toSnapshot()).to.matchSnapshot();
  });

  it("<div>[<span>]</div>", () => {
    expect(render(h.div().children(h.span())).toSnapshot()).to.matchSnapshot();
  });

  it("<div>[<span>, <strong>]</div>", () => {
    expect(render(h.div().children(h.span(), h.strong())).toSnapshot()).to.matchSnapshot();
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
      )).toSnapshot()).to.matchSnapshot();
    });

  describe("svg", () => {
    it("<circle>", () => {
      expect(render(h.circle()).toSnapshot()).to.matchSnapshot();
    });

    it("<circle class='a'>", () => {
      expect(render(h.circle("a")).toSnapshot()).to.matchSnapshot();
    });

    it("<circle style={top: 10px}>", () => {
      expect(render(h.circle().style({ top: "10px" })).toSnapshot()).to.matchSnapshot();
    });

    it("<circle xlink:href='a'>", () => {
      expect(render(h.circle().props({ "xlink:href": "a" })).toSnapshot()).to.matchSnapshot();
    });

    it("<circle xml:text='a'>", () => {
      expect(render(h.circle().props({ "xml:test": "a" })).toSnapshot()).to.matchSnapshot();
    });
  });

  describe("special elements", () => {
    it("<input type='text'>", () => {
      expect(render(h.inputText()).toSnapshot()).to.matchSnapshot();
    });

    it("<input type='text' value='abc'>", () => {
      expect(render(h.inputText().value("abc")).toSnapshot()).to.matchSnapshot();
    });

    it("<input type='checkbox'>", () => {
      expect(render(h.inputCheckbox()).toSnapshot()).to.matchSnapshot();
    });

    it("<input type='checkbox' checked='true'>", () => {
      expect(render(h.inputCheckbox().checked(true)).toSnapshot()).to.matchSnapshot();
    });

    it("<textarea>", () => {
      expect(render(h.textarea()).toSnapshot()).to.matchSnapshot();
    });

    it("<textarea>abc</textarea>", () => {
      expect(render(h.textarea().value("abc")).toSnapshot()).to.matchSnapshot();
    });

    it("<audio>", () => {
      expect(render(h.audio()).toSnapshot()).to.matchSnapshot();
    });

    it("<audio volume=0.5>", () => {
      expect(render(h.audio().props({ volume: 0.5 })).toSnapshot()).to.matchSnapshot();
    });

    it("<video volume=0.5>", () => {
      expect(render(h.video().props({ volume: 0.5 })).toSnapshot()).to.matchSnapshot();
    });
  });
});
