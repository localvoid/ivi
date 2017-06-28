import { Context } from "ivi-core";
import { frag, render, $sc, $fsc, text } from "./utils";
import { context, connect } from "../src/vdom/vnode_factories";
import { expect } from "chai";

function ContextTestPrinter(value: string) {
    return text(value);
}

interface ContextTestPrinterSelect {
    in: string;
    out: string;
}

const $ContextTestPrinter = connect(
    function (
        prev: ContextTestPrinterSelect,
        props: null,
        context: Context<{ value: string }>,
    ): ContextTestPrinterSelect {
        return {
            in: context.value,
            out: context.value,
        };
    },
    ContextTestPrinter,
);

describe("context", () => {
    describe("component API", () => {
        it("<C>10</C>", () => {
            const n = render<HTMLElement>(context({ value: 10 }, $ContextTestPrinter()));
            expect(n.nodeValue).to.equal("10");
        });

        it("<C>10</C> => <C>20</C>", () => {
            const f = frag();
            render<HTMLElement>(context({ value: 10 }, $ContextTestPrinter()), f);
            const b = render<HTMLElement>(context({ value: 20 }, $ContextTestPrinter()), f);
            expect(b.nodeValue).to.equal("20");
        });

        it("<C><S>10</S></C> => <C><S>20</S></C>", () => {
            const f = frag();
            render<HTMLElement>(context({ value: 10 }, $sc($ContextTestPrinter())), f);
            const b = render<HTMLElement>(context({ value: 20 }, $sc($ContextTestPrinter())), f);
            expect(b.nodeValue).to.equal("20");
        });

        it("<C><SF>10</SF></C> => <C><SF>20</SF></C>", () => {
            const f = frag();
            render<HTMLElement>(context({ value: 10 }, $fsc($ContextTestPrinter())), f);
            const b = render<HTMLElement>(context({ value: 20 }, $fsc($ContextTestPrinter())), f);
            expect(b.nodeValue).to.equal("20");
        });
    });
});
