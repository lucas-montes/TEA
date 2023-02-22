pub trait BaseModel {
    type QuerySet;

    fn read(&self) -> Vec<Self::QuerySet>;
}

pub fn read<T>(model: T) -> Vec<T::QuerySet>
where
    T: BaseModel,
{
    return model.read();
}
