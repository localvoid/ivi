import {
  onAbort, EventHandlerFlags, EventSourceAbort, onActivate, EventSourceActivate, onAriaRequest, EventSourceAriaRequest,
  onBeforeActivate, EventSourceBeforeActivate, EventSourceBeforeCopy, onBeforeCopy, EventSourceBeforeCut, onBeforeCut,
  onBeforeDeactivate, EventSourceBeforeDeactivate, onBlur, EventSourceBlur, onCanPlay, EventSourceCanPlay,
  onCanPlaythrough, EventSourceCanPlaythrough, onChange, EventSourceChange, onClick, EventSourceClick, onContextMenu,
  EventSourceContextMenu, onCopy, EventSourceCopy, onCueChange, EventSourceCueChange, onCut, EventSourceCut,
  onDoubleClick, EventSourceDoubleClick, onDeactivate, EventSourceDeactivate, onDrag, EventSourceDrag,
  EventSourceDragEnd, onDragEnd, onDragEnter, EventSourceDragEnter, onDragLeave, EventSourceDragLeave, onDragOver,
  EventSourceDragOver, onDragStart, EventSourceDragStart, onDrop, EventSourceDrop, onDurationChange,
  EventSourceDurationChange, onEmptied, EventSourceEmptied, onEncrypted, EventSourceEncrypted, onEnded, onError,
  EventSourceEnded, EventSourceError, onFocus, EventSourceFocus, onGotPointerCapture, EventSourceGotPointerCapture,
  onInput, EventSourceInput, onInvalid, EventSourceInvalid, onKeyDown, EventSourceKeyDown, onKeyPress,
  EventSourceKeyPress, EventSourceKeyUp, onKeyUp, onLoad, EventSourceLoad, onLoadedData, EventSourceLoadedData,
  onLoadedMetadata, EventSourceLoadedMetadata, onLoadStart, EventSourceLoadStart, onLostPointerCapture,
  EventSourceLostPointerCapture, onMouseDown, EventSourceMouseDown, onMouseEnter, EventSourceMouseEnter, onMouseLeave,
  EventSourceMouseLeave, onMouseMove, EventSourceMouseMove, onMouseOut, EventSourceMouseOut, onMouseOver,
  EventSourceMouseOver, onMouseUp, EventSourceMouseUp, onPaste, EventSourcePaste, onPause, EventSourcePause, onPlay,
  EventSourcePlay, onPlaying, EventSourcePlaying, onPointerCancel, EventSourcePointerCancel, onPointerDown,
  EventSourcePointerDown, onPointerEnter, EventSourcePointerEnter, onPointerLeave, EventSourcePointerLeave,
  onPointerMove, EventSourcePointerMove, onPointerOut, EventSourcePointerOut, onPointerOver,
  EventSourcePointerOver, onPointerUp, EventSourcePointerUp, onProgress, EventSourceProgress, onRateChange,
  EventSourceRateChange, onReset, EventSourceReset, onScroll, EventSourceScroll, onSeeked, EventSourceSeeked,
  onSeeking, EventSourceSeeking, onSelect, EventSourceSelect, onSelectStart, onStalled, onSubmit, onSuspend,
  onTimeUpdate, onTouchCancel, onTouchMove, onTouchStart, onUnload, onVolumeChange, onWaiting, onWheel,
  onActiveTouchEnd, onActiveTouchMove, onActiveTouchStart, onActiveWheel, EventSourceSelectStart, EventSourceStalled,
  EventSourceSubmit, EventSourceSuspend, EventSourceTimeUpdate, EventSourceTouchCancel, onTouchEnd, EventSourceTouchEnd,
  EventSourceTouchMove, EventSourceTouchStart, EventSourceUnload, EventSourceVolumeChange, EventSourceWaiting,
  EventSourceActiveTouchEnd, EventSourceActiveTouchMove, EventSourceActiveTouchStart, EventSourceActiveWheel,
  EventSourceWheel, onBeforePaste, EventSourceBeforePaste,
} from "ivi-events";

function handler(ev: any): void {
  // Event handler...
}

describe(`Event Source`, () => {
  test(`onAbort`, () => {
    const h = onAbort(handler);
    expect(h.source).toBe(EventSourceAbort.eventSource);
  });

  test(`onActivate`, () => {
    const h = onActivate(handler);
    expect(h.source).toBe(EventSourceActivate.eventSource);
  });

  test(`onAriaRequest`, () => {
    const h = onAriaRequest(handler);
    expect(h.source).toBe(EventSourceAriaRequest.eventSource);
  });

  test(`onBeforeActivate`, () => {
    const h = onBeforeActivate(handler);
    expect(h.source).toBe(EventSourceBeforeActivate.eventSource);
  });

  test(`onBeforeCopy`, () => {
    const h = onBeforeCopy(handler);
    expect(h.source).toBe(EventSourceBeforeCopy.eventSource);
  });

  test(`onBeforeCut`, () => {
    const h = onBeforeCut(handler);
    expect(h.source).toBe(EventSourceBeforeCut.eventSource);
  });

  test(`onBeforeDeactivate`, () => {
    const h = onBeforeDeactivate(handler);
    expect(h.source).toBe(EventSourceBeforeDeactivate.eventSource);
  });

  test(`onBeforePaste`, () => {
    const h = onBeforePaste(handler);
    expect(h.source).toBe(EventSourceBeforePaste.eventSource);
  });

  test(`onBlur`, () => {
    const h = onBlur(handler);
    expect(h.source).toBe(EventSourceBlur.eventSource);
  });

  test(`onCanPlay`, () => {
    const h = onCanPlay(handler);
    expect(h.source).toBe(EventSourceCanPlay.eventSource);
  });

  test(`onCanPlaythrough`, () => {
    const h = onCanPlaythrough(handler);
    expect(h.source).toBe(EventSourceCanPlaythrough.eventSource);
  });

  test(`onChange`, () => {
    const h = onChange(handler);
    expect(h.source).toBe(EventSourceChange.eventSource);
  });

  test(`onClick`, () => {
    const h = onClick(handler);
    expect(h.source).toBe(EventSourceClick.eventSource);
  });

  test(`onContextMenu`, () => {
    const h = onContextMenu(handler);
    expect(h.source).toBe(EventSourceContextMenu.eventSource);
  });

  test(`onCopy`, () => {
    const h = onCopy(handler);
    expect(h.source).toBe(EventSourceCopy.eventSource);
  });

  test(`onCueChange`, () => {
    const h = onCueChange(handler);
    expect(h.source).toBe(EventSourceCueChange.eventSource);
  });

  test(`onCut`, () => {
    const h = onCut(handler);
    expect(h.source).toBe(EventSourceCut.eventSource);
  });

  test(`onDoubleClick`, () => {
    const h = onDoubleClick(handler);
    expect(h.source).toBe(EventSourceDoubleClick.eventSource);
  });

  test(`onDeactivate`, () => {
    const h = onDeactivate(handler);
    expect(h.source).toBe(EventSourceDeactivate.eventSource);
  });

  test(`onDrag`, () => {
    const h = onDrag(handler);
    expect(h.source).toBe(EventSourceDrag.eventSource);
  });

  test(`onDragEnd`, () => {
    const h = onDragEnd(handler);
    expect(h.source).toBe(EventSourceDragEnd.eventSource);
  });

  test(`onDragEnter`, () => {
    const h = onDragEnter(handler);
    expect(h.source).toBe(EventSourceDragEnter.eventSource);
  });

  test(`onDragLeave`, () => {
    const h = onDragLeave(handler);
    expect(h.source).toBe(EventSourceDragLeave.eventSource);
  });

  test(`onDragOver`, () => {
    const h = onDragOver(handler);
    expect(h.source).toBe(EventSourceDragOver.eventSource);
  });

  test(`onDragStart`, () => {
    const h = onDragStart(handler);
    expect(h.source).toBe(EventSourceDragStart.eventSource);
  });

  test(`onDrop`, () => {
    const h = onDrop(handler);
    expect(h.source).toBe(EventSourceDrop.eventSource);
  });

  test(`onDurationChange`, () => {
    const h = onDurationChange(handler);
    expect(h.source).toBe(EventSourceDurationChange.eventSource);
  });

  test(`onEmptied`, () => {
    const h = onEmptied(handler);
    expect(h.source).toBe(EventSourceEmptied.eventSource);
  });

  test(`onEncrypted`, () => {
    const h = onEncrypted(handler);
    expect(h.source).toBe(EventSourceEncrypted.eventSource);
  });

  test(`onEnded`, () => {
    const h = onEnded(handler);
    expect(h.source).toBe(EventSourceEnded.eventSource);
  });

  test(`onError`, () => {
    const h = onError(handler);
    expect(h.source).toBe(EventSourceError.eventSource);
  });

  test(`onFocus`, () => {
    const h = onFocus(handler);
    expect(h.source).toBe(EventSourceFocus.eventSource);
  });

  test(`onGotPointerCapture`, () => {
    const h = onGotPointerCapture(handler);
    expect(h.source).toBe(EventSourceGotPointerCapture.eventSource);
  });

  test(`onInput`, () => {
    const h = onInput(handler);
    expect(h.source).toBe(EventSourceInput.eventSource);
  });

  test(`onInvalid`, () => {
    const h = onInvalid(handler);
    expect(h.source).toBe(EventSourceInvalid.eventSource);
  });

  test(`onKeyDown`, () => {
    const h = onKeyDown(handler);
    expect(h.source).toBe(EventSourceKeyDown.eventSource);
  });

  test(`onKeyPress`, () => {
    const h = onKeyPress(handler);
    expect(h.source).toBe(EventSourceKeyPress.eventSource);
  });

  test(`onKeyUp`, () => {
    const h = onKeyUp(handler);
    expect(h.source).toBe(EventSourceKeyUp.eventSource);
  });

  test(`onLoad`, () => {
    const h = onLoad(handler);
    expect(h.source).toBe(EventSourceLoad.eventSource);
  });

  test(`onLoadedData`, () => {
    const h = onLoadedData(handler);
    expect(h.source).toBe(EventSourceLoadedData.eventSource);
  });

  test(`onLoadedMetadata`, () => {
    const h = onLoadedMetadata(handler);
    expect(h.source).toBe(EventSourceLoadedMetadata.eventSource);
  });

  test(`onLoadStart`, () => {
    const h = onLoadStart(handler);
    expect(h.source).toBe(EventSourceLoadStart.eventSource);
  });

  test(`onLostPointerCapture`, () => {
    const h = onLostPointerCapture(handler);
    expect(h.source).toBe(EventSourceLostPointerCapture.eventSource);
  });

  test(`onMouseDown`, () => {
    const h = onMouseDown(handler);
    expect(h.source).toBe(EventSourceMouseDown.eventSource);
  });

  test(`onMouseEnter`, () => {
    const h = onMouseEnter(handler);
    expect(h.source).toBe(EventSourceMouseEnter.eventSource);
  });

  test(`onMouseLeave`, () => {
    const h = onMouseLeave(handler);
    expect(h.source).toBe(EventSourceMouseLeave.eventSource);
  });

  test(`onMouseMove`, () => {
    const h = onMouseMove(handler);
    expect(h.source).toBe(EventSourceMouseMove.eventSource);
  });

  test(`onMouseOut`, () => {
    const h = onMouseOut(handler);
    expect(h.source).toBe(EventSourceMouseOut.eventSource);
  });

  test(`onMouseOver`, () => {
    const h = onMouseOver(handler);
    expect(h.source).toBe(EventSourceMouseOver.eventSource);
  });

  test(`onMouseUp`, () => {
    const h = onMouseUp(handler);
    expect(h.source).toBe(EventSourceMouseUp.eventSource);
  });

  test(`onPaste`, () => {
    const h = onPaste(handler);
    expect(h.source).toBe(EventSourcePaste.eventSource);
  });

  test(`onPause`, () => {
    const h = onPause(handler);
    expect(h.source).toBe(EventSourcePause.eventSource);
  });

  test(`onPlay`, () => {
    const h = onPlay(handler);
    expect(h.source).toBe(EventSourcePlay.eventSource);
  });

  test(`onPlaying`, () => {
    const h = onPlaying(handler);
    expect(h.source).toBe(EventSourcePlaying.eventSource);
  });

  test(`onPointerCancel`, () => {
    const h = onPointerCancel(handler);
    expect(h.source).toBe(EventSourcePointerCancel.eventSource);
  });

  test(`onPointerDown`, () => {
    const h = onPointerDown(handler);
    expect(h.source).toBe(EventSourcePointerDown.eventSource);
  });

  test(`onPointerEnter`, () => {
    const h = onPointerEnter(handler);
    expect(h.source).toBe(EventSourcePointerEnter.eventSource);
  });

  test(`onPointerLeave`, () => {
    const h = onPointerLeave(handler);
    expect(h.source).toBe(EventSourcePointerLeave.eventSource);
  });

  test(`onPointerMove`, () => {
    const h = onPointerMove(handler);
    expect(h.source).toBe(EventSourcePointerMove.eventSource);
  });

  test(`onPointerOut`, () => {
    const h = onPointerOut(handler);
    expect(h.source).toBe(EventSourcePointerOut.eventSource);
  });

  test(`onPointerOver`, () => {
    const h = onPointerOver(handler);
    expect(h.source).toBe(EventSourcePointerOver.eventSource);
  });

  test(`onPointerUp`, () => {
    const h = onPointerUp(handler);
    expect(h.source).toBe(EventSourcePointerUp.eventSource);
  });

  test(`onProgress`, () => {
    const h = onProgress(handler);
    expect(h.source).toBe(EventSourceProgress.eventSource);
  });

  test(`onRateChange`, () => {
    const h = onRateChange(handler);
    expect(h.source).toBe(EventSourceRateChange.eventSource);
  });

  test(`onReset`, () => {
    const h = onReset(handler);
    expect(h.source).toBe(EventSourceReset.eventSource);
  });

  test(`onScroll`, () => {
    const h = onScroll(handler);
    expect(h.source).toBe(EventSourceScroll.eventSource);
  });

  test(`onSeeked`, () => {
    const h = onSeeked(handler);
    expect(h.source).toBe(EventSourceSeeked.eventSource);
  });

  test(`onSeeking`, () => {
    const h = onSeeking(handler);
    expect(h.source).toBe(EventSourceSeeking.eventSource);
  });

  test(`onSelect`, () => {
    const h = onSelect(handler);
    expect(h.source).toBe(EventSourceSelect.eventSource);
  });

  test(`onSelectStart`, () => {
    const h = onSelectStart(handler);
    expect(h.source).toBe(EventSourceSelectStart.eventSource);
  });

  test(`onStalled`, () => {
    const h = onStalled(handler);
    expect(h.source).toBe(EventSourceStalled.eventSource);
  });

  test(`onSubmit`, () => {
    const h = onSubmit(handler);
    expect(h.source).toBe(EventSourceSubmit.eventSource);
  });

  test(`onSuspend`, () => {
    const h = onSuspend(handler);
    expect(h.source).toBe(EventSourceSuspend.eventSource);
  });

  test(`onTimeUpdate`, () => {
    const h = onTimeUpdate(handler);
    expect(h.source).toBe(EventSourceTimeUpdate.eventSource);
  });

  test(`onTouchCancel`, () => {
    const h = onTouchCancel(handler);
    expect(h.source).toBe(EventSourceTouchCancel.eventSource);
  });

  test(`onTouchEnd`, () => {
    const h = onTouchEnd(handler);
    expect(h.source).toBe(EventSourceTouchEnd.eventSource);
  });

  test(`onTouchMove`, () => {
    const h = onTouchMove(handler);
    expect(h.source).toBe(EventSourceTouchMove.eventSource);
  });

  test(`onTouchStart`, () => {
    const h = onTouchStart(handler);
    expect(h.source).toBe(EventSourceTouchStart.eventSource);
  });

  test(`onUnload`, () => {
    const h = onUnload(handler);
    expect(h.source).toBe(EventSourceUnload.eventSource);
  });

  test(`onVolumeChange`, () => {
    const h = onVolumeChange(handler);
    expect(h.source).toBe(EventSourceVolumeChange.eventSource);
  });

  test(`onWaiting`, () => {
    const h = onWaiting(handler);
    expect(h.source).toBe(EventSourceWaiting.eventSource);
  });

  test(`onWheel`, () => {
    const h = onWheel(handler);
    expect(h.source).toBe(EventSourceWheel.eventSource);
  });

  test(`onActiveTouchEnd`, () => {
    const h = onActiveTouchEnd(handler);
    expect(h.source).toBe(EventSourceActiveTouchEnd.eventSource);
  });

  test(`onActiveTouchMove`, () => {
    const h = onActiveTouchMove(handler);
    expect(h.source).toBe(EventSourceActiveTouchMove.eventSource);
  });

  test(`onActiveTouchStart`, () => {
    const h = onActiveTouchStart(handler);
    expect(h.source).toBe(EventSourceActiveTouchStart.eventSource);
  });

  test(`onActiveWheel`, () => {
    const h = onActiveWheel(handler);
    expect(h.source).toBe(EventSourceActiveWheel.eventSource);
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
