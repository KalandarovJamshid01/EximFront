const documentStatus = (step, ) => {
    if (step === 1) return { text: "Отправлено", class: "waiting" };
    if (step === 2) return { text: "В обработке", class: "in-process" };
    if (step === 3) return { text: "На доработку", class: "warning" };
    if (step === 4) return { text: "Ожидайте", class: "warning-checking" };
    if (step === 5) return { text: "Подготовка счёта", class: "preparation" };
    if (step === 6) return { text: "Отменено", class: "closed" };
    if (step === 7) return { text: "Ожидается оплата", class: "warning-checking" };
    if (step === 8) return { text: "Оплачено", class: "success" };
    if (step === 9) return { text: "В процессе", class: "payment-in-process" };
    if (step === 10) return { text: "Отменено", class: "closed" };
    if (step === 11) return { text: "Готово", class: "dark-success" };
}

export default documentStatus;