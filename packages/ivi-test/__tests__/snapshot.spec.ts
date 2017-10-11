import { virtualRender as render } from "../src/vdom";
import * as h from "ivi-html";
import { expect } from "iko";

describe("src/snapshot.ts", () => {
  it("'abc'", () => {
    expect(render(h.t("abc")).toSnapshot()).toMatchSnapshot();
  });

  it("<div>", () => {
    expect(render(h.div()).toSnapshot()).toMatchSnapshot();
  });

  it("<span>", () => {
    expect(render(h.span()).toSnapshot()).toMatchSnapshot();
  });

  it("<div> (null props)", () => {
    expect(render(h.div().attrs(null)).toSnapshot()).toMatchSnapshot();
  });

  it("<div> ({} props)", () => {
    expect(render(h.div().attrs({})).toSnapshot()).toMatchSnapshot();
  });

  it("<div tabIndex='1'>", () => {
    expect(render(h.div().attrs({ tabIndex: 1 })).toSnapshot()).toMatchSnapshot();
  });

  it("<div tabIndex='1' title='2'>", () => {
    expect(render(h.div().attrs({ tabIndex: 1, title: "2" })).toSnapshot()).toMatchSnapshot();
  });

  it("<div data-abc='a'", () => {
    expect(render(h.div().attrs({ "data-abc": "a" })).toSnapshot()).toMatchSnapshot();
  });

  it("<div aria-type='button'", () => {
    expect(render(h.div().attrs({ "aria-type": "button" })).toSnapshot()).toMatchSnapshot();
  });

  it("<div class=''>", () => {
    expect(render(h.div("")).toSnapshot()).toMatchSnapshot();
  });

  it("<div class='a'>", () => {
    expect(render(h.div("a")).toSnapshot()).toMatchSnapshot();
  });

  it("<div class='a b'>", () => {
    expect(render(h.div("a b")).toSnapshot()).toMatchSnapshot();
  });

  it("<div style=null>", () => {
    expect(render(h.div().style(null)).toSnapshot()).toMatchSnapshot();
  });

  it("<div style={top: 10px}>", () => {
    expect(render(h.div().style({ top: "10px" })).toSnapshot()).toMatchSnapshot();
  });

  it("<div style={float: 'left'}>", () => {
    expect(render(h.div().style({ float: "left" })).toSnapshot()).toMatchSnapshot();
  });

  it("<div style={top: 10px; left: 20px}>", () => {
    expect(render(h.div().style({ top: "10px", left: "20px" })).toSnapshot()).toMatchSnapshot();
  });

  it("<div></div> (null children)", () => {
    expect(render(h.div().children(null)).toSnapshot()).toMatchSnapshot();
  });

  it("<div>'abc'</div>", () => {
    expect(render(h.div().children("abc")).toSnapshot()).toMatchSnapshot();
  });

  it("<div>10</div>", () => {
    expect(render(h.div().children(10)).toSnapshot()).toMatchSnapshot();
  });

  it("<div><span></div>", () => {
    expect(render(h.div().children(h.span())).toSnapshot()).toMatchSnapshot();
  });

  it("<div>[]</div>", () => {
    expect(render(h.div().children([])).toSnapshot()).toMatchSnapshot();
  });

  it("<div>[<span>]</div>", () => {
    expect(render(h.div().children(h.span())).toSnapshot()).toMatchSnapshot();
  });

  it("<div>[<span>, <strong>]</div>", () => {
    expect(render(h.div().children(h.span(), h.strong())).toSnapshot()).toMatchSnapshot();
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
      )).toSnapshot()).toMatchSnapshot();
    });

  describe("svg", () => {
    it("<circle>", () => {
      expect(render(h.circle()).toSnapshot()).toMatchSnapshot();
    });

    it("<circle class='a'>", () => {
      expect(render(h.circle("a")).toSnapshot()).toMatchSnapshot();
    });

    it("<circle style={top: 10px}>", () => {
      expect(render(h.circle().style({ top: "10px" })).toSnapshot()).toMatchSnapshot();
    });

    it("<circle xlink:href='a'>", () => {
      expect(render(h.circle().attrs({ "xlink:href": "a" })).toSnapshot()).toMatchSnapshot();
    });

    it("<circle xml:text='a'>", () => {
      expect(render(h.circle().attrs({ "xml:test": "a" })).toSnapshot()).toMatchSnapshot();
    });
  });

  describe("special elements", () => {
    it("<input>", () => {
      expect(render(h.input()).toSnapshot()).toMatchSnapshot();
    });

    it("<input value='abc'>", () => {
      expect(render(h.input().value("abc")).toSnapshot()).toMatchSnapshot();
    });

    it("<input type='checkbox'>", () => {
      expect(render(h.inputCheckbox()).toSnapshot()).toMatchSnapshot();
    });

    it("<input type='checkbox' checked='true'>", () => {
      expect(render(h.inputCheckbox().checked(true)).toSnapshot()).toMatchSnapshot();
    });

    it("<textarea>", () => {
      expect(render(h.textarea()).toSnapshot()).toMatchSnapshot();
    });

    it("<textarea>abc</textarea>", () => {
      expect(render(h.textarea().value("abc")).toSnapshot()).toMatchSnapshot();
    });

    it("<audio>", () => {
      expect(render(h.audio()).toSnapshot()).toMatchSnapshot();
    });

    it("<audio volume=0.5>", () => {
      expect(render(h.audio().attrs({ volume: 0.5 })).toSnapshot()).toMatchSnapshot();
    });

    it("<video volume=0.5>", () => {
      expect(render(h.video().attrs({ volume: 0.5 })).toSnapshot()).toMatchSnapshot();
    });
  });
});
