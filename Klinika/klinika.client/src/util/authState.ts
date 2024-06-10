import {UserData} from "../store/zAuth.ts";

export const authState = {
    token: undefined as string | undefined,
    data: undefined as UserData | undefined,
    setToken: function(token: string | undefined) {
        this.token = token;
    },
    setData: function(data: UserData | undefined) {
        this.data = data;
    },
    getToken: function() {
        return this.token;
    },
    getData: function() {
        return this.data;
    },
    setContent: function() {
        return this.data;
    }
};