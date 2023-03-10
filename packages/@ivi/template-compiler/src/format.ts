/**
 * Template flags.
 *
 * State size and children size are used to preallocate arrays when template is
 * instantiated.
 *
 *     TemplateFlags {
 *       stateSize:10,    // The number of state slots
 *       childrenSize:10, // The number of children slots
 *       svg:1,
 *     }
 *
 *     stateSize = flags & Mask10;
 *     childrenSize = (flags >> ChildrenSizeShift) & Mask10;
 *     svg = flags & Svg;
 */
export const enum TemplateFlags {
  ChildrenSizeShift = 10,
  /** Template contains SVG elements */
  Svg = 1 << 20,
  Mask10 = (1 << 10) - 1,
}

/**
 * Template state opcodes.
 *
 *     OpCode {
 *       type:1,      // Next | EnterOrRemove
 *       save:1,
 *       offset:10,   // Assigned to Enter opCodes
 *       saveSlot:10, // Assigned to Save opCodes (used during compilation)
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
  /** Moves cursor to the next node. */
  Next = 0b01,
  /** Enter or Remove operation. */
  EnterOrRemove = 0b10,
  /** Saves current node */
  Save = 0b100,
  OffsetShift = 3,
  SaveSlotShift = 13,
  AssignSlot = 1 << SaveSlotShift,
  Mask10 = (1 << 10) - 1,
}

/**
 * Commonly used properties.
 */
export const enum CommonPropType {
  ClassName = 0,
  TextContent = 1,
}

/**
 * Template property opcodes.
 *
 *     PropOpCode(SetNode) {
 *       type:3,   // SetNode
 *       data:10,  // State index
 *     }
 *     PropOpCode(Common) {
 *       type:3,   // Common
 *       data:10,  // Common Property Type
 *       input:10, // Expr index
 *     }
 *     PropOpCode(..) {
 *       type:3,
 *       data:10,  // Data Index
 *       input:10, // Expr index
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
  /** dataIndex = `(op >> DataShift) & Mask10` */
  DataShift = 3,
  /** inputIndex = `op >> InputShift` */
  InputShift = 13,
  /** Masks 10 lowest bits. */
  Mask10 = (1 << 10) - 1,
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
  SetNodeType = 0b1,
  ValueShift = 2,
}
