import {
  onAbort, EventHandlerFlags, EVENT_SOURCE_ABORT, onActivate, EVENT_SOURCE_ACTIVATE, onAriaRequest,
  EVENT_SOURCE_ARIA_REQUEST, onBeforeActivate, EVENT_SOURCE_BEFORE_ACTIVATE, EVENT_SOURCE_BEFORE_COPY, onBeforeCopy,
  EVENT_SOURCE_BEFORE_CUT, onBeforeCut, onBeforeDeactivate, EVENT_SOURCE_BEFORE_DEACTIVATE, onBlur, EVENT_SOURCE_BLUR,
  onCanPlay, EVENT_SOURCE_CAN_PLAY, onCanPlaythrough, EVENT_SOURCE_CAN_PLAYTHROUGH, onChange, EVENT_SOURCE_CHANGE,
  onClick, EVENT_SOURCE_CLICK, onContextMenu, EVENT_SOURCE_CONTEXT_MENU, onCopy, EVENT_SOURCE_COPY, onCueChange,
  EVENT_SOURCE_CUE_CHANGE, onCut, EVENT_SOURCE_CUT, onDoubleClick, EVENT_SOURCE_DOUBLE_CLICK, onDeactivate,
  EVENT_SOURCE_DEACTIVATE, onDrag, EVENT_SOURCE_DRAG, EVENT_SOURCE_DRAG_END, onDragEnd, onDragEnter,
  EVENT_SOURCE_DRAG_ENTER, onDragLeave, EVENT_SOURCE_DRAG_LEAVE, onDragOver, EVENT_SOURCE_DRAG_OVER, onDragStart,
  EVENT_SOURCE_DRAG_START, onDrop, EVENT_SOURCE_DROP, onDurationChange, EVENT_SOURCE_DURATION_CHANGE, onEmptied,
  EVENT_SOURCE_EMPTIED, onEncrypted, EVENT_SOURCE_ENCRYPTED, onEnded, onError, EVENT_SOURCE_ENDED, EVENT_SOURCE_ERROR,
  onFocus, EVENT_SOURCE_FOCUS, onGotPointerCapture, EVENT_SOURCE_GOT_POINTER_CAPTURE, onInput, EVENT_SOURCE_INPUT,
  onInvalid, EVENT_SOURCE_INVALID, onKeyDown, EVENT_SOURCE_KEY_DOWN, onKeyPress, EVENT_SOURCE_KEY_PRESS,
  EVENT_SOURCE_KEY_UP, onKeyUp, onLoad, EVENT_SOURCE_LOAD, onLoadedData, EVENT_SOURCE_LOADED_DATA, onLoadedMetadata,
  EVENT_SOURCE_LOADED_METADATA, onLoadStart, EVENT_SOURCE_LOAD_START, onLostPointerCapture,
  EVENT_SOURCE_LOST_POINTER_CAPTURE, onMouseDown, EVENT_SOURCE_MOUSE_DOWN, onMouseEnter, EVENT_SOURCE_MOUSE_ENTER,
  onMouseLeave, EVENT_SOURCE_MOUSE_LEAVE, onMouseMove, EVENT_SOURCE_MOUSE_MOVE, onMouseOut, EVENT_SOURCE_MOUSE_OUT,
  onMouseOver, EVENT_SOURCE_MOUSE_OVER, onMouseUp, EVENT_SOURCE_MOUSE_UP, onPaste, EVENT_SOURCE_PASTE, onPause,
  EVENT_SOURCE_PAUSE, onPlay, EVENT_SOURCE_PLAY, onPlaying, EVENT_SOURCE_PLAYING, onPointerCancel,
  EVENT_SOURCE_POINTER_CANCEL, onPointerDown, EVENT_SOURCE_POINTER_DOWN, onPointerEnter, EVENT_SOURCE_POINTER_ENTER,
  onPointerLeave, EVENT_SOURCE_POINTER_LEAVE, onPointerMove, EVENT_SOURCE_POINTER_MOVE, onPointerOut,
  EVENT_SOURCE_POINTER_OUT, onPointerOver, EVENT_SOURCE_POINTER_OVER, onPointerUp, EVENT_SOURCE_POINTER_UP, onProgress,
  EVENT_SOURCE_PROGRESS, onRateChange, EVENT_SOURCE_RATE_CHANGE, onReset, EVENT_SOURCE_RESET, onScroll,
  EVENT_SOURCE_SCROLL, onSeeked, EVENT_SOURCE_SEEKED, onSeeking, EVENT_SOURCE_SEEKING, onSelect, EVENT_SOURCE_SELECT,
  onSelectStart, onStalled, onSubmit, onSuspend, onTimeUpdate, onTouchCancel, onTouchMove, onTouchStart, onUnload,
  onVolumeChange, onWaiting, onWheel, onActiveTouchEnd, onActiveTouchMove, onActiveTouchStart, onActiveWheel,
  EVENT_SOURCE_SELECT_START, EVENT_SOURCE_STALLED, EVENT_SOURCE_SUBMIT, EVENT_SOURCE_SUSPEND, EVENT_SOURCE_TIME_UPDATE,
  EVENT_SOURCE_TOUCH_CANCEL, onTouchEnd, EVENT_SOURCE_TOUCH_END, EVENT_SOURCE_TOUCH_MOVE, EVENT_SOURCE_TOUCH_START,
  EVENT_SOURCE_UNLOAD, EVENT_SOURCE_VOLUME_CHANGE, EVENT_SOURCE_WAITING, EVENT_SOURCE_ACTIVE_TOUCH_END,
  EVENT_SOURCE_ACTIVE_TOUCH_MOVE, EVENT_SOURCE_ACTIVE_TOUCH_START, EVENT_SOURCE_ACTIVE_WHEEL, EVENT_SOURCE_WHEEL,
  onBeforePaste, EVENT_SOURCE_BEFORE_PASTE,
} from "ivi-events";

function handler(ev: any): void {
  // Event handler...
}

describe(`Event Source`, () => {
  test(`onAbort`, () => {
    const h = onAbort(handler);
    expect(h.src).toBe(EVENT_SOURCE_ABORT.src);
  });

  test(`onActivate`, () => {
    const h = onActivate(handler);
    expect(h.src).toBe(EVENT_SOURCE_ACTIVATE.src);
  });

  test(`onAriaRequest`, () => {
    const h = onAriaRequest(handler);
    expect(h.src).toBe(EVENT_SOURCE_ARIA_REQUEST.src);
  });

  test(`onBeforeActivate`, () => {
    const h = onBeforeActivate(handler);
    expect(h.src).toBe(EVENT_SOURCE_BEFORE_ACTIVATE.src);
  });

  test(`onBeforeCopy`, () => {
    const h = onBeforeCopy(handler);
    expect(h.src).toBe(EVENT_SOURCE_BEFORE_COPY.src);
  });

  test(`onBeforeCut`, () => {
    const h = onBeforeCut(handler);
    expect(h.src).toBe(EVENT_SOURCE_BEFORE_CUT.src);
  });

  test(`onBeforeDeactivate`, () => {
    const h = onBeforeDeactivate(handler);
    expect(h.src).toBe(EVENT_SOURCE_BEFORE_DEACTIVATE.src);
  });

  test(`onBeforePaste`, () => {
    const h = onBeforePaste(handler);
    expect(h.src).toBe(EVENT_SOURCE_BEFORE_PASTE.src);
  });

  test(`onBlur`, () => {
    const h = onBlur(handler);
    expect(h.src).toBe(EVENT_SOURCE_BLUR.src);
  });

  test(`onCanPlay`, () => {
    const h = onCanPlay(handler);
    expect(h.src).toBe(EVENT_SOURCE_CAN_PLAY.src);
  });

  test(`onCanPlaythrough`, () => {
    const h = onCanPlaythrough(handler);
    expect(h.src).toBe(EVENT_SOURCE_CAN_PLAYTHROUGH.src);
  });

  test(`onChange`, () => {
    const h = onChange(handler);
    expect(h.src).toBe(EVENT_SOURCE_CHANGE.src);
  });

  test(`onClick`, () => {
    const h = onClick(handler);
    expect(h.src).toBe(EVENT_SOURCE_CLICK.src);
  });

  test(`onContextMenu`, () => {
    const h = onContextMenu(handler);
    expect(h.src).toBe(EVENT_SOURCE_CONTEXT_MENU.src);
  });

  test(`onCopy`, () => {
    const h = onCopy(handler);
    expect(h.src).toBe(EVENT_SOURCE_COPY.src);
  });

  test(`onCueChange`, () => {
    const h = onCueChange(handler);
    expect(h.src).toBe(EVENT_SOURCE_CUE_CHANGE.src);
  });

  test(`onCut`, () => {
    const h = onCut(handler);
    expect(h.src).toBe(EVENT_SOURCE_CUT.src);
  });

  test(`onDoubleClick`, () => {
    const h = onDoubleClick(handler);
    expect(h.src).toBe(EVENT_SOURCE_DOUBLE_CLICK.src);
  });

  test(`onDeactivate`, () => {
    const h = onDeactivate(handler);
    expect(h.src).toBe(EVENT_SOURCE_DEACTIVATE.src);
  });

  test(`onDrag`, () => {
    const h = onDrag(handler);
    expect(h.src).toBe(EVENT_SOURCE_DRAG.src);
  });

  test(`onDragEnd`, () => {
    const h = onDragEnd(handler);
    expect(h.src).toBe(EVENT_SOURCE_DRAG_END.src);
  });

  test(`onDragEnter`, () => {
    const h = onDragEnter(handler);
    expect(h.src).toBe(EVENT_SOURCE_DRAG_ENTER.src);
  });

  test(`onDragLeave`, () => {
    const h = onDragLeave(handler);
    expect(h.src).toBe(EVENT_SOURCE_DRAG_LEAVE.src);
  });

  test(`onDragOver`, () => {
    const h = onDragOver(handler);
    expect(h.src).toBe(EVENT_SOURCE_DRAG_OVER.src);
  });

  test(`onDragStart`, () => {
    const h = onDragStart(handler);
    expect(h.src).toBe(EVENT_SOURCE_DRAG_START.src);
  });

  test(`onDrop`, () => {
    const h = onDrop(handler);
    expect(h.src).toBe(EVENT_SOURCE_DROP.src);
  });

  test(`onDurationChange`, () => {
    const h = onDurationChange(handler);
    expect(h.src).toBe(EVENT_SOURCE_DURATION_CHANGE.src);
  });

  test(`onEmptied`, () => {
    const h = onEmptied(handler);
    expect(h.src).toBe(EVENT_SOURCE_EMPTIED.src);
  });

  test(`onEncrypted`, () => {
    const h = onEncrypted(handler);
    expect(h.src).toBe(EVENT_SOURCE_ENCRYPTED.src);
  });

  test(`onEnded`, () => {
    const h = onEnded(handler);
    expect(h.src).toBe(EVENT_SOURCE_ENDED.src);
  });

  test(`onError`, () => {
    const h = onError(handler);
    expect(h.src).toBe(EVENT_SOURCE_ERROR.src);
  });

  test(`onFocus`, () => {
    const h = onFocus(handler);
    expect(h.src).toBe(EVENT_SOURCE_FOCUS.src);
  });

  test(`onGotPointerCapture`, () => {
    const h = onGotPointerCapture(handler);
    expect(h.src).toBe(EVENT_SOURCE_GOT_POINTER_CAPTURE.src);
  });

  test(`onInput`, () => {
    const h = onInput(handler);
    expect(h.src).toBe(EVENT_SOURCE_INPUT.src);
  });

  test(`onInvalid`, () => {
    const h = onInvalid(handler);
    expect(h.src).toBe(EVENT_SOURCE_INVALID.src);
  });

  test(`onKeyDown`, () => {
    const h = onKeyDown(handler);
    expect(h.src).toBe(EVENT_SOURCE_KEY_DOWN.src);
  });

  test(`onKeyPress`, () => {
    const h = onKeyPress(handler);
    expect(h.src).toBe(EVENT_SOURCE_KEY_PRESS.src);
  });

  test(`onKeyUp`, () => {
    const h = onKeyUp(handler);
    expect(h.src).toBe(EVENT_SOURCE_KEY_UP.src);
  });

  test(`onLoad`, () => {
    const h = onLoad(handler);
    expect(h.src).toBe(EVENT_SOURCE_LOAD.src);
  });

  test(`onLoadedData`, () => {
    const h = onLoadedData(handler);
    expect(h.src).toBe(EVENT_SOURCE_LOADED_DATA.src);
  });

  test(`onLoadedMetadata`, () => {
    const h = onLoadedMetadata(handler);
    expect(h.src).toBe(EVENT_SOURCE_LOADED_METADATA.src);
  });

  test(`onLoadStart`, () => {
    const h = onLoadStart(handler);
    expect(h.src).toBe(EVENT_SOURCE_LOAD_START.src);
  });

  test(`onLostPointerCapture`, () => {
    const h = onLostPointerCapture(handler);
    expect(h.src).toBe(EVENT_SOURCE_LOST_POINTER_CAPTURE.src);
  });

  test(`onMouseDown`, () => {
    const h = onMouseDown(handler);
    expect(h.src).toBe(EVENT_SOURCE_MOUSE_DOWN.src);
  });

  test(`onMouseEnter`, () => {
    const h = onMouseEnter(handler);
    expect(h.src).toBe(EVENT_SOURCE_MOUSE_ENTER.src);
  });

  test(`onMouseLeave`, () => {
    const h = onMouseLeave(handler);
    expect(h.src).toBe(EVENT_SOURCE_MOUSE_LEAVE.src);
  });

  test(`onMouseMove`, () => {
    const h = onMouseMove(handler);
    expect(h.src).toBe(EVENT_SOURCE_MOUSE_MOVE.src);
  });

  test(`onMouseOut`, () => {
    const h = onMouseOut(handler);
    expect(h.src).toBe(EVENT_SOURCE_MOUSE_OUT.src);
  });

  test(`onMouseOver`, () => {
    const h = onMouseOver(handler);
    expect(h.src).toBe(EVENT_SOURCE_MOUSE_OVER.src);
  });

  test(`onMouseUp`, () => {
    const h = onMouseUp(handler);
    expect(h.src).toBe(EVENT_SOURCE_MOUSE_UP.src);
  });

  test(`onPaste`, () => {
    const h = onPaste(handler);
    expect(h.src).toBe(EVENT_SOURCE_PASTE.src);
  });

  test(`onPause`, () => {
    const h = onPause(handler);
    expect(h.src).toBe(EVENT_SOURCE_PAUSE.src);
  });

  test(`onPlay`, () => {
    const h = onPlay(handler);
    expect(h.src).toBe(EVENT_SOURCE_PLAY.src);
  });

  test(`onPlaying`, () => {
    const h = onPlaying(handler);
    expect(h.src).toBe(EVENT_SOURCE_PLAYING.src);
  });

  test(`onPointerCancel`, () => {
    const h = onPointerCancel(handler);
    expect(h.src).toBe(EVENT_SOURCE_POINTER_CANCEL.src);
  });

  test(`onPointerDown`, () => {
    const h = onPointerDown(handler);
    expect(h.src).toBe(EVENT_SOURCE_POINTER_DOWN.src);
  });

  test(`onPointerEnter`, () => {
    const h = onPointerEnter(handler);
    expect(h.src).toBe(EVENT_SOURCE_POINTER_ENTER.src);
  });

  test(`onPointerLeave`, () => {
    const h = onPointerLeave(handler);
    expect(h.src).toBe(EVENT_SOURCE_POINTER_LEAVE.src);
  });

  test(`onPointerMove`, () => {
    const h = onPointerMove(handler);
    expect(h.src).toBe(EVENT_SOURCE_POINTER_MOVE.src);
  });

  test(`onPointerOut`, () => {
    const h = onPointerOut(handler);
    expect(h.src).toBe(EVENT_SOURCE_POINTER_OUT.src);
  });

  test(`onPointerOver`, () => {
    const h = onPointerOver(handler);
    expect(h.src).toBe(EVENT_SOURCE_POINTER_OVER.src);
  });

  test(`onPointerUp`, () => {
    const h = onPointerUp(handler);
    expect(h.src).toBe(EVENT_SOURCE_POINTER_UP.src);
  });

  test(`onProgress`, () => {
    const h = onProgress(handler);
    expect(h.src).toBe(EVENT_SOURCE_PROGRESS.src);
  });

  test(`onRateChange`, () => {
    const h = onRateChange(handler);
    expect(h.src).toBe(EVENT_SOURCE_RATE_CHANGE.src);
  });

  test(`onReset`, () => {
    const h = onReset(handler);
    expect(h.src).toBe(EVENT_SOURCE_RESET.src);
  });

  test(`onScroll`, () => {
    const h = onScroll(handler);
    expect(h.src).toBe(EVENT_SOURCE_SCROLL.src);
  });

  test(`onSeeked`, () => {
    const h = onSeeked(handler);
    expect(h.src).toBe(EVENT_SOURCE_SEEKED.src);
  });

  test(`onSeeking`, () => {
    const h = onSeeking(handler);
    expect(h.src).toBe(EVENT_SOURCE_SEEKING.src);
  });

  test(`onSelect`, () => {
    const h = onSelect(handler);
    expect(h.src).toBe(EVENT_SOURCE_SELECT.src);
  });

  test(`onSelectStart`, () => {
    const h = onSelectStart(handler);
    expect(h.src).toBe(EVENT_SOURCE_SELECT_START.src);
  });

  test(`onStalled`, () => {
    const h = onStalled(handler);
    expect(h.src).toBe(EVENT_SOURCE_STALLED.src);
  });

  test(`onSubmit`, () => {
    const h = onSubmit(handler);
    expect(h.src).toBe(EVENT_SOURCE_SUBMIT.src);
  });

  test(`onSuspend`, () => {
    const h = onSuspend(handler);
    expect(h.src).toBe(EVENT_SOURCE_SUSPEND.src);
  });

  test(`onTimeUpdate`, () => {
    const h = onTimeUpdate(handler);
    expect(h.src).toBe(EVENT_SOURCE_TIME_UPDATE.src);
  });

  test(`onTouchCancel`, () => {
    const h = onTouchCancel(handler);
    expect(h.src).toBe(EVENT_SOURCE_TOUCH_CANCEL.src);
  });

  test(`onTouchEnd`, () => {
    const h = onTouchEnd(handler);
    expect(h.src).toBe(EVENT_SOURCE_TOUCH_END.src);
  });

  test(`onTouchMove`, () => {
    const h = onTouchMove(handler);
    expect(h.src).toBe(EVENT_SOURCE_TOUCH_MOVE.src);
  });

  test(`onTouchStart`, () => {
    const h = onTouchStart(handler);
    expect(h.src).toBe(EVENT_SOURCE_TOUCH_START.src);
  });

  test(`onUnload`, () => {
    const h = onUnload(handler);
    expect(h.src).toBe(EVENT_SOURCE_UNLOAD.src);
  });

  test(`onVolumeChange`, () => {
    const h = onVolumeChange(handler);
    expect(h.src).toBe(EVENT_SOURCE_VOLUME_CHANGE.src);
  });

  test(`onWaiting`, () => {
    const h = onWaiting(handler);
    expect(h.src).toBe(EVENT_SOURCE_WAITING.src);
  });

  test(`onWheel`, () => {
    const h = onWheel(handler);
    expect(h.src).toBe(EVENT_SOURCE_WHEEL.src);
  });

  test(`onActiveTouchEnd`, () => {
    const h = onActiveTouchEnd(handler);
    expect(h.src).toBe(EVENT_SOURCE_ACTIVE_TOUCH_END.src);
  });

  test(`onActiveTouchMove`, () => {
    const h = onActiveTouchMove(handler);
    expect(h.src).toBe(EVENT_SOURCE_ACTIVE_TOUCH_MOVE.src);
  });

  test(`onActiveTouchStart`, () => {
    const h = onActiveTouchStart(handler);
    expect(h.src).toBe(EVENT_SOURCE_ACTIVE_TOUCH_START.src);
  });

  test(`onActiveWheel`, () => {
    const h = onActiveWheel(handler);
    expect(h.src).toBe(EVENT_SOURCE_ACTIVE_WHEEL.src);
  });
});

describe(`Capture Mode`, () => {
  describe(`enabled`, () => {
    test(`onAbort`, () => {
      const h = onAbort(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onActivate`, () => {
      const h = onActivate(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onAriaRequest`, () => {
      const h = onAriaRequest(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onBeforeActivate`, () => {
      const h = onBeforeActivate(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onBeforeCopy`, () => {
      const h = onBeforeCopy(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onBeforeCut`, () => {
      const h = onBeforeCut(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onBeforeDeactivate`, () => {
      const h = onBeforeDeactivate(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onBeforePaste`, () => {
      const h = onBeforePaste(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onBlur`, () => {
      const h = onBlur(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onCanPlay`, () => {
      const h = onCanPlay(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onCanPlaythrough`, () => {
      const h = onCanPlaythrough(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onChange`, () => {
      const h = onChange(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onClick`, () => {
      const h = onClick(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onContextMenu`, () => {
      const h = onContextMenu(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onCopy`, () => {
      const h = onCopy(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onCueChange`, () => {
      const h = onCueChange(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onCut`, () => {
      const h = onCut(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onDoubleClick`, () => {
      const h = onDoubleClick(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onDeactivate`, () => {
      const h = onDeactivate(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onDrag`, () => {
      const h = onDrag(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onDragEnd`, () => {
      const h = onDragEnd(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onDragEnter`, () => {
      const h = onDragEnter(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onDragLeave`, () => {
      const h = onDragLeave(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onDragOver`, () => {
      const h = onDragOver(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onDragStart`, () => {
      const h = onDragStart(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onDrop`, () => {
      const h = onDrop(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onDurationChange`, () => {
      const h = onDurationChange(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onEmptied`, () => {
      const h = onEmptied(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onEncrypted`, () => {
      const h = onEncrypted(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onEnded`, () => {
      const h = onEnded(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onError`, () => {
      const h = onError(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onFocus`, () => {
      const h = onFocus(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onGotPointerCapture`, () => {
      const h = onGotPointerCapture(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onInput`, () => {
      const h = onInput(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onInvalid`, () => {
      const h = onInvalid(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onKeyDown`, () => {
      const h = onKeyDown(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onKeyPress`, () => {
      const h = onKeyPress(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onKeyUp`, () => {
      const h = onKeyUp(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onLoad`, () => {
      const h = onLoad(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onLoadedData`, () => {
      const h = onLoadedData(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onLoadedMetadata`, () => {
      const h = onLoadedMetadata(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onLoadStart`, () => {
      const h = onLoadStart(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onLostPointerCapture`, () => {
      const h = onLostPointerCapture(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onMouseDown`, () => {
      const h = onMouseDown(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onMouseEnter`, () => {
      const h = onMouseEnter(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onMouseLeave`, () => {
      const h = onMouseLeave(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onMouseMove`, () => {
      const h = onMouseMove(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onMouseOut`, () => {
      const h = onMouseOut(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onMouseOver`, () => {
      const h = onMouseOver(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onMouseUp`, () => {
      const h = onMouseUp(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onPaste`, () => {
      const h = onPaste(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onPause`, () => {
      const h = onPause(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onPlay`, () => {
      const h = onPlay(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onPlaying`, () => {
      const h = onPlaying(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onPointerCancel`, () => {
      const h = onPointerCancel(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onPointerDown`, () => {
      const h = onPointerDown(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onPointerEnter`, () => {
      const h = onPointerEnter(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onPointerLeave`, () => {
      const h = onPointerLeave(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onPointerMove`, () => {
      const h = onPointerMove(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onPointerOut`, () => {
      const h = onPointerOut(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onPointerOver`, () => {
      const h = onPointerOver(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onPointerUp`, () => {
      const h = onPointerUp(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onProgress`, () => {
      const h = onProgress(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onRateChange`, () => {
      const h = onRateChange(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onReset`, () => {
      const h = onReset(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onScroll`, () => {
      const h = onScroll(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onSeeked`, () => {
      const h = onSeeked(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onSeeking`, () => {
      const h = onSeeking(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onSelect`, () => {
      const h = onSelect(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onSelectStart`, () => {
      const h = onSelectStart(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onStalled`, () => {
      const h = onStalled(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onSubmit`, () => {
      const h = onSubmit(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onSuspend`, () => {
      const h = onSuspend(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onTimeUpdate`, () => {
      const h = onTimeUpdate(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onTouchCancel`, () => {
      const h = onTouchCancel(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onTouchEnd`, () => {
      const h = onTouchEnd(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onTouchMove`, () => {
      const h = onTouchMove(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onTouchStart`, () => {
      const h = onTouchStart(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onUnload`, () => {
      const h = onUnload(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onVolumeChange`, () => {
      const h = onVolumeChange(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onWaiting`, () => {
      const h = onWaiting(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onWheel`, () => {
      const h = onWheel(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onActiveTouchEnd`, () => {
      const h = onActiveTouchEnd(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onActiveTouchMove`, () => {
      const h = onActiveTouchMove(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onActiveTouchStart`, () => {
      const h = onActiveTouchStart(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });

    test(`onActiveWheel`, () => {
      const h = onActiveWheel(handler);
      expect(h.flags & EventHandlerFlags.Capture).toBeFalsy();
    });
  });

  describe(`disabled`, () => {
    test(`onAbort`, () => {
      const h = onAbort(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onActivate`, () => {
      const h = onActivate(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onAriaRequest`, () => {
      const h = onAriaRequest(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onBeforeActivate`, () => {
      const h = onBeforeActivate(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onBeforeCopy`, () => {
      const h = onBeforeCopy(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onBeforeCut`, () => {
      const h = onBeforeCut(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onBeforeDeactivate`, () => {
      const h = onBeforeDeactivate(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onBeforePaste`, () => {
      const h = onBeforePaste(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onBlur`, () => {
      const h = onBlur(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onCanPlay`, () => {
      const h = onCanPlay(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onCanPlaythrough`, () => {
      const h = onCanPlaythrough(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onChange`, () => {
      const h = onChange(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onClick`, () => {
      const h = onClick(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onContextMenu`, () => {
      const h = onContextMenu(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onCopy`, () => {
      const h = onCopy(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onCueChange`, () => {
      const h = onCueChange(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onCut`, () => {
      const h = onCut(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onDoubleClick`, () => {
      const h = onDoubleClick(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onDeactivate`, () => {
      const h = onDeactivate(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onDrag`, () => {
      const h = onDrag(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onDragEnd`, () => {
      const h = onDragEnd(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onDragEnter`, () => {
      const h = onDragEnter(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onDragLeave`, () => {
      const h = onDragLeave(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onDragOver`, () => {
      const h = onDragOver(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onDragStart`, () => {
      const h = onDragStart(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onDrop`, () => {
      const h = onDrop(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onDurationChange`, () => {
      const h = onDurationChange(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onEmptied`, () => {
      const h = onEmptied(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onEncrypted`, () => {
      const h = onEncrypted(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onEnded`, () => {
      const h = onEnded(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onError`, () => {
      const h = onError(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onFocus`, () => {
      const h = onFocus(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onGotPointerCapture`, () => {
      const h = onGotPointerCapture(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onInput`, () => {
      const h = onInput(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onInvalid`, () => {
      const h = onInvalid(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onKeyDown`, () => {
      const h = onKeyDown(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onKeyPress`, () => {
      const h = onKeyPress(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onKeyUp`, () => {
      const h = onKeyUp(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onLoad`, () => {
      const h = onLoad(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onLoadedData`, () => {
      const h = onLoadedData(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onLoadedMetadata`, () => {
      const h = onLoadedMetadata(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onLoadStart`, () => {
      const h = onLoadStart(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onLostPointerCapture`, () => {
      const h = onLostPointerCapture(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onMouseDown`, () => {
      const h = onMouseDown(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onMouseEnter`, () => {
      const h = onMouseEnter(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onMouseLeave`, () => {
      const h = onMouseLeave(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onMouseMove`, () => {
      const h = onMouseMove(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onMouseOut`, () => {
      const h = onMouseOut(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onMouseOver`, () => {
      const h = onMouseOver(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onMouseUp`, () => {
      const h = onMouseUp(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onPaste`, () => {
      const h = onPaste(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onPause`, () => {
      const h = onPause(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onPlay`, () => {
      const h = onPlay(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onPlaying`, () => {
      const h = onPlaying(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onPointerCancel`, () => {
      const h = onPointerCancel(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onPointerDown`, () => {
      const h = onPointerDown(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onPointerEnter`, () => {
      const h = onPointerEnter(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onPointerLeave`, () => {
      const h = onPointerLeave(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onPointerMove`, () => {
      const h = onPointerMove(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onPointerOut`, () => {
      const h = onPointerOut(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onPointerOver`, () => {
      const h = onPointerOver(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onPointerUp`, () => {
      const h = onPointerUp(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onProgress`, () => {
      const h = onProgress(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onRateChange`, () => {
      const h = onRateChange(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onReset`, () => {
      const h = onReset(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onScroll`, () => {
      const h = onScroll(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onSeeked`, () => {
      const h = onSeeked(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onSeeking`, () => {
      const h = onSeeking(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onSelect`, () => {
      const h = onSelect(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onSelectStart`, () => {
      const h = onSelectStart(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onStalled`, () => {
      const h = onStalled(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onSubmit`, () => {
      const h = onSubmit(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onSuspend`, () => {
      const h = onSuspend(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onTimeUpdate`, () => {
      const h = onTimeUpdate(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onTouchCancel`, () => {
      const h = onTouchCancel(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onTouchEnd`, () => {
      const h = onTouchEnd(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onTouchMove`, () => {
      const h = onTouchMove(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onTouchStart`, () => {
      const h = onTouchStart(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onUnload`, () => {
      const h = onUnload(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onVolumeChange`, () => {
      const h = onVolumeChange(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onWaiting`, () => {
      const h = onWaiting(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onWheel`, () => {
      const h = onWheel(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onActiveTouchEnd`, () => {
      const h = onActiveTouchEnd(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onActiveTouchMove`, () => {
      const h = onActiveTouchMove(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onActiveTouchStart`, () => {
      const h = onActiveTouchStart(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });

    test(`onActiveWheel`, () => {
      const h = onActiveWheel(handler, true);
      expect(h.flags & EventHandlerFlags.Capture).toBeTruthy();
    });
  });
});
