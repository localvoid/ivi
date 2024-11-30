/** Template Data. */
export interface TemplateData {
  /**
   * SMI (Small Integer) value that packs several values:
   *
   *     struct Data {
   *       stateSize:10;    // The number of state slots
   *       childrenSize:10; // The number of children slots
   *       svg:1;           // Template with SVG elements
   *     }
   *
   * stateSize and childrenSize are used for preallocating arrays with
   * exact number to avoid dynamic growth and reduce memory consumption.
   */
  f: number,
  /**
   * Array of SMI values that stores OpCodes for updating element properties.
   */
  p: PropOpCode[],
  /**
   * Array of SMI values that stores OpCodes for updating children nodes.
   */
  c: ChildOpCode[],
  /**
   * Array of SMI values that stores opCodes for traversing DOM nodes and
   * saving references to DOM nodes into internal state when template is
   * instantiated.
   */
  s: StateOpCode[],
  /** Array of string values that stores keys for dynamic properties. */
  d: any[],
}

/**
 * Template flags.
 *
 * State size and children size are used to preallocate arrays when template is
 * instantiated.
 *
 *     TemplateFlags {
 *       stateSize:6,    // The number of state slots
 *       childrenSize:6, // The number of children slots
 *       svg:1,
 *     }
 *
 *     stateSize = flags & Mask10;
 *     childrenSize = (flags >> ChildrenSizeShift) & Mask10;
 *     svg = flags & Svg;
 */
export const enum TemplateFlags {
  ChildrenSizeShift = 6,
  /** Template contains SVG elements */
  Svg = 1 << 12,
  Mask6 = (1 << 6) - 1,
}

/**
 * Template state opcodes.
 *
 *     OpCode {
 *       flags:3,
 *       offset:..,   // Assigned to Enter opCodes
 *     }
 *
 * To disambiguate between Enter and Remove operations we can check for the
 * presence of offset value. Remove OpCode shouldn't have any offsets.
 *
 * Enter operation moves cursor inside of the current node. Offset value is
 * used to determine which operations should be applied to the current node.
 *
 *     offset = `op >> OffsetShift`
 *
 * Remove operation removes a marker `<!>` that separates two text nodes.
 *
 * Remove operation implies that next node is a text node and it should be
 * saved.
 */
export const enum StateOpCode {
  /** Saves current node */
  Save = 0b001,
  /** Enter or Remove operation. */
  EnterOrRemove = 0b010,
  /**
   * Expression before DOM node.
   *
   * Used during hydration to figure out correct DOM offsets.
   */
  PrevExpr = 0b100,
  OffsetShift = 3,
}

/**
 * Commonly used properties.
 */
export const enum CommonPropType {
  ClassName = 0,
  TextContent = 1,
  InnerHTML = 2,
}

/**
 * Template property opcodes.
 *
 *     PropOpCode(SetNode) {
 *       type:3,   // SetNode
 *       index:6,  // State index
 *     }
 *     PropOpCode(Common) {
 *       type:3,   // Common
 *       input:6,  // Expr index
 *       data:..,   // Common Property Type
 *     }
 *     PropOpCode(..) {
 *       type:3,
 *       input:6,  // Expr index
 *       data:..,  // Data Index
 *     }
 */
export const enum PropOpCode {
  /** Sets current node. */
  SetNode = 0,
  /** Commonly used properties to reduce data size. */
  Common = 1,
  /** Updates an attribute. */
  Attribute = 2,
  /** Updates a property. */
  Property = 3,
  /** Use DOM as a source of truth when diffing property value. */
  DiffDOMProperty = 4,
  /** Updates a style. */
  Style = 5,
  /** Updates an event. */
  Event = 6,
  /** Executes a directive. */
  Directive = 7,
  /** propType = `op & PropTypeMask` */
  TypeMask = 0b111,
  /** inputIndex = `(op >> InputShift) & Mask6` */
  InputShift = 3,
  /** dataIndex = `op >> DataShift` */
  DataShift = 9,
  /** Masks 10 lowest bits. */
  Mask6 = (1 << 6) - 1,
}

/**
 * Template child opcodes.
 *
 *     ChildOpCode {
 *       type:2,   // Child | SetNext | SetParent
 *       value:10,
 *     }
 */
export const enum ChildOpCode {
  Child = 0b00,
  SetNext = 0b01,
  SetParent = 0b11,
  Type = 0b11,
  SetNodeType = 0b01,
  ValueShift = 2,
}
