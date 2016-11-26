/**
 * Screen of Death.
 *
 * When exception is thrown, inject Screen of Death into document.
 *
 * To disable Screen of Death, set Dev Mode `DisableScreenOfDeath` flag with a function
 * `setDevModeFlags(DevModeFlags.DisableScreenOfDeath)`.
 */
import { DevModeFlags, DEV_MODE } from "./dev_mode";
import { devModeOnError } from "./hooks";
import { getEventTarget } from "../common/dom";

/**
 * Screen of Death Element.
 */
let screenOfDeathElement: HTMLDivElement | undefined;

/**
 * Store original body margin when Screen of Death is injected.
 */
let bodyMargin: string | null;
/**
 * Store original body padding when Screen of Death is injected.
 */
let bodyPadding: string | null;

/**
 * Inject Screen of Death into document.
 *
 * @param title Title.
 * @param content Content.
 */
export function injectScreenOfDeath(title: string, content: string): void {
    if (__IVI_DEV__ && __IVI_BROWSER__) {
        if (!(DEV_MODE & DevModeFlags.DisableScreenOfDeath)) {
            if (!screenOfDeathElement) {
                // Save original body margin and padding.
                bodyMargin = document.body.style.margin;
                bodyPadding = document.body.style.padding;

                // Remove body margin and padding.
                document.body.style.margin = "0";
                document.body.style.padding = "0";

                // Inject Screen of Death.
                screenOfDeathElement = document.createElement("div");
                const style = screenOfDeathElement.style;
                style.zIndex = "2147483647";
                style.backgroundColor = "#600";
                style.position = "absolute";
                style.top = "0";
                style.right = "0";
                style.bottom = "0";
                style.left = "0";
                style.boxSizing = "border-box";
                style.padding = "1em";
                screenOfDeathElement.innerHTML = `` +
                    `<div style="color:#fff;font-family:monospace;font-weight:bold;font-size:2em;line-height:2em">` +
                    `${title}</div>` +
                    `<pre style="color:#fff;font-weight:bold;font-size:1.2em">${content}</pre>` +
                    `<div` +
                    ` style="position:absolute;top:0;right:0;padding:1em;color:#fff;cursor:pointer;` +
                    `font-size:2em;line-height:1em;font-weight:bold"` +
                    ` class="ivi-screen-of-death-close">x</div>`;
                screenOfDeathElement.style.color = "#fff";
                screenOfDeathElement.addEventListener("click", (ev) => {
                    if ((getEventTarget(ev) as Element).className === "ivi-screen-of-death-close") {
                        removeScreenOfDeath();
                    }
                });
                document.body.appendChild(screenOfDeathElement);
            }
        }
    }
}

/**
 * Remove Screen of Death.
 */
function removeScreenOfDeath(): void {
    if (__IVI_DEV__ && __IVI_BROWSER__) {
        if (!(DEV_MODE & DevModeFlags.DisableScreenOfDeath)) {
            if (screenOfDeathElement) {
                // Restore original body margin and padding.
                document.body.style.margin = bodyMargin;
                document.body.style.padding = bodyPadding;

                // Remove Screen of Death.
                document.body.removeChild(screenOfDeathElement);
                screenOfDeathElement = undefined;
            }
        }
    }
}

/**
 * Register global event handler for unhandled exceptions.
 */
if (__IVI_DEV__ && __IVI_BROWSER__) {
    if (!(DEV_MODE & (DevModeFlags.DisableScreenOfDeath | DevModeFlags.DisableScreenOfDeathGlobalErrorHandling))) {
        window.addEventListener("error", function screenOfDeathErrorHandler(e: ErrorEvent) {
            devModeOnError(e.error);
            injectScreenOfDeath(`Global Error: ${e.error.message}`, e.error.stack);
        });
    }
}
