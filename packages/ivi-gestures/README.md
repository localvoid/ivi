# Gestures

It is an **EXPERIMENTAL** package that provides a gesture recognition system with automatic gesture disambiguation.

## Features

- Supports use cases like Long Press DnD inside of a container with a native scrolling.
- Gesture disambiguation algorithm automatically resolve conflicts between concurrent gesture recognizers.
- Drag and Drop events.
- Unified Touch and Mouse Events (pointer events spec have several issues that makes them useless for some types of
 gestures: [Issue#178](https://github.com/w3c/pointerevents/issues/178), [Issue#216](https://github.com/w3c/pointerevents/issues/216))

## Browser Compatibility

### Android Chrome (Opera, Samsung Internet, UC Browser)

[~78% Market Share](http://gs.statcounter.com/browser-market-share/mobile/worldwide)

Everything works perfectly.

### iOS Safari

[~17% Market Share](http://gs.statcounter.com/browser-market-share/mobile/worldwide)

Use cases that involve conflicting NativePan and Pan gestures are working unreliably when NativePan is recognizing
movement in one direction and Pan is recognizing movement in the opposite direction. When pointer moves really fast,
NativePan will often win because Safari starts sending uncancellable `TouchMove` events (impossible to fix). Haven't
seen any native applications that are using gestures in such way, terrible UX.

Other use cases are working perfectly.

### Mobile Firefox

[~0.3% Market Share](http://gs.statcounter.com/browser-market-share/mobile/worldwide)

All native gestures are permanently blocked when there are conflicting gesture recognizers (impossible to fix).

## Roadmap

- Add global velocity tracking. Recognizers should be able to declare when they need to track pointer velocity, instead
 of tracking velocity by themselves.
- Add multitouch gestures: scale, rotate.
- Combine gesture recognizers. There should be a tool to combine several different recognizers so that they could
 recognize different gestures concurrently.
- Add specialized event handlers for DnD `onDrop()`, `onDragOver()` etc.
- Add specialized event handlers when touching outside of the element.

## Quick Example

```ts
const Container = statefulComponent(class extends Component {
  private events = onNativePan();

  render() {
    return div()
      .e(this.events)
      .c(Child());
  }
});

const Child = statefulComponent(class extends Component {
  private events = onLongPress((ev) => {
    console.log("Long Press", ev);
  });

  render() {
    return div().e(this.events);
  }
});

render(
  Container(),
  document.getElementById("app"),
);
```

## Gesture Disambiguation Algorithm

When first pointer is down, event dispatcher will instantiate gesture recognizers that should receive pointer event
(lazy initialization), then it will dispatch pointer event to them. Gesture recognizers in response should activate
itself using a `GestureController` function that available on all gesture recognizers at `controller` property.

Then we need to immediately reject conflicting recognizers that can't be recognized. For example, if we have two Pan
recognizers, then first one will never be recognized. This step is important when we completely override native
gestures, because on iOS Safari we always need to invoke `preventDefault()` on the first `TouchMove` event, otherwise
it can start sending non-cancelable events.

Then if there are still conflicting recognizers, we are starting to wait until gesture recognizers either recognize
gesture or cancel themselves.

Then we need to check that other active gesture recognizers doesn't depend on the time, so we are starting to invoke
lifecycle method `shouldWait()` and if someone needs to wait, disambiguation algorithm will wait until all awaiting
recognizers either resolved or canceled.

Then if there are still several conflicting resolved recognizers, we just use "last recognizer with highest number of
active pointers wins" strategy. This strategy works perfectly in all scenarios. If there are two Tap recognizers,
innermost one will win because we are dispatching pointer events in a capture mode.

## Quirks

### Chrome 15px slop

Chrome doesn't send touch move events after the first one until 15px slop region is exceeded. But we need this events,
so that we can use them to resolve conflicts between native and custom gestures, and the trick is to invoke
`preventDefault()` on the first `TouchMove` event, then it will start sending all touch move events. The good news is
that invoking `preventDefault()` on the first `TouchMove` doesn't stop native gestures from recognizing, so we can
stop listening touch move events when we were able to recognize native gesture.

https://developers.google.com/web/updates/2014/05/A-More-Compatible-Smoother-Touch

### Mobile Safari is broken

- `preventDefault()` doesn't work when touchmove handler is registered in touchdown handler. https://bugs.webkit.org/show_bug.cgi?id=182521
- Broken scrolling and fixed elements: https://medium.com/@dvoytenko/amp-ios-scrolling-and-position-fixed-b854a5a0d451

### Mobile Safari scale events should be explicity blocked

When native scaling gesture is recognized, touch events will have `scale` property with a value less or greater than
`1`.

### Mobile Safari doesn't support `InputDeviceCapabilities`

https://wicg.github.io/InputDeviceCapabilities/

## Additional Resources

- [Getting touchy - everything you (n)ever wanted to know about touch and pointer events](https://patrickhlauke.github.io/getting-touchy-presentation/)
- [Touch Event behavior details across browsers](https://docs.google.com/document/d/12k_LL_Ot9GjF8zGWP9eI_3IMbSizD72susba0frg44Y)
- [Issues with touch events](https://docs.google.com/document/d/12-HPlSIF7-ISY8TQHtuQ3IqDi-isZVI0Yzv5zwl90VU)

### Gesture Recognition Systems

- [iOS](https://developer.apple.com/documentation/uikit/uigesturerecognizer)
- [Android](https://developer.android.com/training/gestures/)
- [gtk3](https://developer.gnome.org/gtk3/stable/Gestures.html)
- [Qt](http://doc.qt.io/qt-5/gestures-overview.html)
- [Flutter](https://github.com/flutter/flutter/tree/master/packages/flutter/lib/src/gestures) - Automatic gesture
 disambiguation algorithm. `ivi-gestures` implementation were inspired by the ideas from this project, but now it is
 using completely different heuristics for gesture disambiguation.
- [TouchScript](https://github.com/TouchScript/TouchScript/wiki) - Unity3D
- [Hammer.js](https://github.com/hammerjs/hammer.js) - Most popular gesture recognition lib for the web platform.
 Unable to handle complex scenarios, flawed architecture.

### Non-standard recognizers

- [Pinch-to-Zoom plus](https://www.youtube.com/watch?v=x-hFyzdwoL8)
