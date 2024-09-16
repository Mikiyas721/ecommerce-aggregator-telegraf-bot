import {Right} from "telegraf-721";

export default abstract class Entity extends Right {
    protected constructor(public id: string | undefined) {
        super();
    }
}
