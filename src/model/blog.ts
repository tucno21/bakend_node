import Model from "../core/model";

class Blog extends Model {
    protected tableName = 'blogs';
    protected primaryKey = 'id';
    protected fillable = ['titulo', 'contenido', 'usuario_id',];
    protected timestamps = true;
}

export default new Blog();