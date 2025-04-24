import {io} from 'socket.io-client';

const SOCKET_URL = 'http://192.168.1.106:5000';
//const SOCKET_URL = 'http://localhost:5000';

class SocketService{
    socket = null;

    connect() {
        this.socket=io(SOCKET_URL);

        this.socket.on('connect',()=>{
            console.log('Connected to server with ID:', this.socket.id);
        });

        this.socket.on('connect_error',(error)=>{
            console.log('Connection error', error);
        });
    }

    disconnect(){
        if(this.socket){
            this.socket.disconnect();
            this.socket=null;
        }
    }

    sendMessage(message){
        if(this.socket){
            this.socket.emit('sendMessage', message);
        }
    }

    onMessage(callback){
        if(this.socket){
            this.socket.on('message', callback);
        }
    }

    onPreviousMessages(callback){
        if(this.socket){
            this.socket.on('previousMessages', callback);
        }
    }

    removeListeners(){
        if(this.socket){
            this.socket.off('message');
            this.socket.off('previousMessages');
        }
    }
}
export default new SocketService();