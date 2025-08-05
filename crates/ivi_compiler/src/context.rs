use std::marker::PhantomData;

pub type TraverseCtx<'a> = oxc_traverse::TraverseCtx<'a, TraverseCtxState<'a>>;

#[derive(Default)]
pub struct TraverseCtxState<'a> {
    data: PhantomData<&'a ()>,
}
