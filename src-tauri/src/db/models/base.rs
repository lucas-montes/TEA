trait BaseModel {
    fn create(&self);
    fn update(&self);
}

fn create<T>(model: T)
where
    T: BaseModel,
{
    model.create()
}

fn update<T>(model: T)
where
    T: BaseModel,
{
    model.update()
}
