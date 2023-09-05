import Model from "../core/model";

class Etiquetas extends Model {
    protected tableName = 'etiquetas';
    protected primaryKey = 'id';
    protected fillable = ['nombre'];
    protected timestamps = false;
}

export default new Etiquetas();