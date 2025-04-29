
import io from 'socket.io-client';
import { Base_Url } from './Constant';


export const socketConnection = ()=>{
    return io(Base_Url);
}