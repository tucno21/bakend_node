import Model from "../core/model";

class User extends Model {
    protected tableName = 'usuarios';
    protected primaryKey = 'id';
    protected fillable = ['nombre', 'email', 'password', 'imagen'];
    protected hidden = ['password'];
    protected timestamps = true;
    protected created = 'created_at';
    protected updated = 'updated_at';
}

export default new User();