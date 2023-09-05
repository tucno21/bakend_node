import Model from "../core/model";

class BlogEtiquetas extends Model {
    protected tableName = 'blogs_etiquetas';
    protected primaryKey = 'id';
    protected fillable = ['etiqueta_id', 'blog_id'];
    protected timestamps = false;
}

export default new BlogEtiquetas();