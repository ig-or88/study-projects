export default function toFix(value) {
    value = parseFloat(value); // преобразовываем строку в число
    return value.toFixed(2); // обрезается до 2-х знаков после запятой
};

// export { toFix };
