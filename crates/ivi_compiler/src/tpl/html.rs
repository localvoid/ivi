pub fn is_html_void_element(tag: &str) -> bool {
    matches!(
        tag,
        "audio"
            | "video"
            | "embed"
            | "input"
            | "param"
            | "source"
            | "track"
            | "area"
            | "base"
            | "link"
            | "meta"
            | "br"
            | "col"
            | "hr"
            | "img"
            | "wbr"
    )
}
