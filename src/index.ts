import app from "./app";
import AppDataSource from "./config/data.source";

async function startServer() {

    try {

        await AppDataSource.initialize();
        console.log("Conexión a la base de datos establecida");
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT || 3000}`);
        });

    }catch (error) {
        if (error instanceof Error) {
            console.error("Error al iniciar el servidor:", error.message);
        }
    }

}

startServer();