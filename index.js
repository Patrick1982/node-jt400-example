const jt400 = require('node-jt400');


const DB_HOST = process.argv[2];
const DB_USER = process.argv[3];
const DB_PASSWORD = process.argv[4];
const sqlQuery = process.argv[5];


const config = {
  'translate binary': 'true',
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  errors: 'full',
};

const pool = jt400.pool(config);

async function checkConexion(sqlQuery) {
  try {
    const resultados = await pool.query(sqlQuery);
    console.log('Conexión exitosa, resultados:', resultados);
    await pool.close();
    console.log('Conexión cerrada exitosamente.');
    process.exit(0);
  } catch (error) {
    console.error('Error al conectar o consultar la base de datos:', error);
  }
}


if (!sqlQuery) {
  console.log('Por favor, proporciona una consulta SQL como argumento.');
  process.exit(1);
}

checkConexion(sqlQuery);
