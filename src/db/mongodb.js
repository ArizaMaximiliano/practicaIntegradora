import mongoose from "mongoose";

export const init = async () => {
    try {
        const URI = 'mongodb://localhost:27017/';
        await mongoose.connect(URI);
        console.log('Database conectada');
    } catch(error){
        console.log('Ocurrio un error al intetar conectarse a la DB', error.message);
    }
}