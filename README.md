## 1. Descripción
Este proyecto es una API REST desarrollada en Node.js con Express que consume una API externa para obtener información de criptomonedas y expone un endpoint propio con datos transformados.

La API no retorna la respuesta original, sino que filtra y simplifica la información relevante como nombre, símbolo, precio y capitalización de mercado.

## 2. Cómo ejecutar el proyecto
    - Clonar el repositorio: git clone 
    - Instalar dependencias: npm install
    - Configurar variables de entorno .env que estan en .env.example
    - Ejecutar el servidor:  npm run dev
    - Registro de Usuario: POST http://localhost:3000/api/register   o https://api-financiera-h4argzbabsd7ekd3.eastus-01.azurewebsites.net/api/register
        {
            "email": "test@test.com",
            "password": "123"
        }
    - Inicio de sesion para obtener el token: POST http://localhost:3000/api/login o https://api-financiera-h4argzbabsd7ekd3.eastus-01.azurewebsites.net/api/login
        {
            "email": "test@test.com",
            "password": "123"
        }
    - Consultar Criptomonedas (Ruta Protegida): GET http://localhost:3000/api/cryptos o o https://api-financiera-h4argzbabsd7ekd3.eastus-01.azurewebsites.net/api/cryptos

## 3. API externa utilizada
Se utilizó la API pública de CoinGecko:
Endpoint: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd

## 4. Arquitectura del Proyecto
Se implementó una arquitectura limpia basada en capas para garantizar la escalabilidad:

- **Controllers**: Manejan las peticiones HTTP y las respuestas.
- **Services**: Contienen la lógica de negocio y la integración con la API de CoinGecko.
- **Entities**: Modelos de datos gestionados con TypeORM.
- **Middlewares**: Protección de rutas mediante JWT

## 5. Docker 
El proyecto está containerizado para facilitar el despliegue:

```bash
# Construir imagen
docker build -t api-financiera .

# Ejecutar contenedor
docker run -p 3000:3000 --env-file .env api-financiera
