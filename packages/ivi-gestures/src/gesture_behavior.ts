export const enum GestureBehavior {
  PanUp = 1,
  PanRight = 1 << 1,
  PanDown = 1 << 2,
  PanLeft = 1 << 3,
  Press = 1 << 4,
  Scale = 1 << 5,
  Rotate = 1 << 7,
  Tap = 1 << 6,
  /**
   * Native gesture
   */
  Native = 1 << 6,

  PanX = PanLeft | PanRight,
  PanY = PanUp | PanDown,
  Pan = PanX | PanY,
}
