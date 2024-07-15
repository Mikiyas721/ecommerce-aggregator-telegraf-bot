import {Right} from "../../utils/fp/f_p";

export default abstract class Entity extends Right {
    protected constructor(public id: string | undefined) {
        super();
    }
}
