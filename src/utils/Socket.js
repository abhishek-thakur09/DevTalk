
import io from 'socket.io-client';
import { Base_Url } from './Constant';


// Revise this thing....
export const socketConnection = () => {

    if (location.hostname == 'localhost') {
        return io(Base_Url);
    }
    else {
        return io("/", { path: "/api/socket.io" })
    }
}