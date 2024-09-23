import winston from 'winston';

const { combine, timestamp, json, errors } = winston.format;

// Definir formato JSON estructurado para analítica
const structuredLogFormat = combine(
  timestamp(), // Añadir timestamp a cada log
  errors({ stack: true }), // Incluir stack trace en caso de errores
  json() // Convertir los logs en formato JSON para fácil análisis
);

// Configurar el logger
const logger = winston.createLogger({
  level: 'info',
  format: structuredLogFormat,
  defaultMeta: { service: 'ms-administracion' }, // Meta por defecto, como el nombre del microservicio
  transports: [
    new winston.transports.Console(), // Log en consola
    new winston.transports.File({ filename: 'logs/combined.log' }), // Log en archivo general
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Log en archivo de errores
  ],
});

export const logInfo = (message:string, context:any) => {
  logger.info({
    message,
    correlationId: context.correlationId,
    operationName: context.operationName,
    userId: context.userId,
    input: context.inputData,
    output: context.outputData,
    ip: context.ipAddress
  });
};

export const logError = (message:string, error:any, context:any) => {
  logger.error({
    message,
    correlationId: context.correlationId,
    operationName: context.operationName,
    userId: context.userId,
    input: context.inputData,
    stack: error.stack,
    ip: context.ipAddress
  });
};
