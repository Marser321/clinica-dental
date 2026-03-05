const { parseISO, format } = require('date-fns');
const { es } = require('date-fns/locale');

const range = '["2026-03-10 14:00:29","2026-03-10 15:00:29")';
const match = range.match(/\["?(.*?)"?,\s*"?(.*?)"?\)/);
if (match) {
    const dStr = match[1];
    console.log("Extracted string:", dStr);

    try {
        const d = parseISO(dStr);
        console.log("Parsed Date:", d);
        console.log("Formatted:", format(d, "dd 'de' MMMM", { locale: es }));
    } catch (e) {
        console.error("Error with parseISO:", e);
    }

    try {
        const d2 = new Date(dStr.replace(' ', 'T'));
        console.log("Parsed Date with T:", d2);
        console.log("Formatted:", format(d2, "dd 'de' MMMM", { locale: es }));
    } catch (e) {
        console.error("Error with T:", e);
    }
}
