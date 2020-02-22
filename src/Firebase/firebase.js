import app from 'firebase/app';
import {config} from '../config';
import 'firebase/database';

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.db = app.database();
    }
    async addWishItem(name, item) {
        return await this.db.ref(`WishList/${name}/list`).push({
            name: item.name,
            link: item.link
        });
    }
    async editWishItem(name, item, itemKey) {
        console.log(name, item, itemKey);
        return await this.db.ref(`WishList/${name}/list/${itemKey}`).set({
            name: item.name,
            link: item.link
        });
    }
    getAllItems = () => {
        return this.db.ref(`WishList`);
    }
    deleteItem = (itemKey, name) => {
        return this.db.ref(`WishList/${name}/list/${itemKey}`).remove();
    }

}

export default Firebase;