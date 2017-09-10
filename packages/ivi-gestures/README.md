# Gestures

It is an **EXPERIMENTAL** package that provides an abstraction on top of Touch and Mouse events.

Instead of using raw native events for different pointers, all touch and mouse interactions should be implemented as
gestures. Native gestures like scrolling are also implemented as gestures, so when native gesture is detected we can
remove all event handlers to make sure that scrolling isn't waiting for responses from UI thread.

It also provides extended capabilities to efficieltny solve:

- Drag and Drop with complex use cases like long-pressure DnD inside a container with native scrolling
- Click-outside events
