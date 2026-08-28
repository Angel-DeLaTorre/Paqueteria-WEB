import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

/**
 * Formatea una fecha ISO (UTC) a un formato legible en español y hora local.
 * Ejemplo: "lunes 23, agosto 2026"
 */
export const formatearFechaLocal = (fechaIso: string | null | undefined): string => {
    if (!fechaIso) return 'Sin fecha';

    // dayjs convierte automáticamente la fecha UTC a la hora local del navegador
    //return dayjs(fechaIso).format('dddd DD, MMMM YYYY');
    return dayjs(fechaIso).format('dddd DD, MMMM YYYY [a las] HH:mm');
};

/**
 * Si prefieres mantener la salida exacta con la función nativa de JavaScript (toLocaleString)
 * adaptada a la zona horaria local de México:
 */
export const formatearFechaConToLocaleString = (fechaIso: string | null | undefined): string => {
    if (!fechaIso) return 'Sin fecha';

    return new Date(fechaIso).toLocaleDateString('es-MX', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
};
