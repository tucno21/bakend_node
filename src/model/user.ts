import model from "../core/model";

model.define(
    'users',
    'id',
    [
        'name',
        'lastname',
        'email',
        'phone',
        'password',
        'image'
    ],
    [
        'password'
    ],
    true,
    'created_at',
    'updated_at'
);

export default model;