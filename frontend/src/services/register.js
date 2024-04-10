import { RegisterAPI } from "./api/registerAPI";

export const RegisterService = {
    register : (data) => RegisterAPI.register('/register',data),
}