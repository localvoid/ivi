pub mod template_flags {
    pub const CHILDREN_SIZE_SHIFT: u32 = 6;
    pub const SVG: u32 = 1 << 12;
}

pub mod state_op {
    pub const SAVE: u32 = 0b01;
    pub const ENTER_OR_REMOVE: u32 = 0b10;
    pub const OFFSET_SHIFT: u32 = 2;
}

pub mod common_prop_type {
    pub const CLASS_NAME: u32 = 0;
    pub const TEXT_CONTENT: u32 = 1;
    pub const INNER_HTML: u32 = 2;
}

pub mod prop_op {
    pub const SET_NODE: u32 = 0;
    pub const COMMON: u32 = 1;
    pub const ATTRIBUTE: u32 = 2;
    pub const PROPERTY: u32 = 3;
    pub const DIFF_DOM_PROPERTY: u32 = 4;
    pub const STYLE: u32 = 5;
    pub const EVENT: u32 = 6;
    pub const DIRECTIVE: u32 = 7;
    pub const TYPE_MASK: u32 = 0b111;
    pub const INPUT_SHIFT: u32 = 3;
    pub const DATA_SHIFT: u32 = 9;
}

pub mod child_op {
    pub const CHILD: u32 = 0b00;
    pub const SET_NEXT: u32 = 0b01;
    pub const SET_PARENT: u32 = 0b11;
    pub const TYPE: u32 = 0b11;
    pub const VALUE_SHIFT: u32 = 2;
}
