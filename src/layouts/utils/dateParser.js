const dateParser = (date) => {
    let exactDate = new Date(date);
    let actualDate = `от ${exactDate.getDate()}-${exactDate.getMonth() + 1}-${exactDate.getFullYear()} г в. ${exactDate.getHours()}:${exactDate.getMinutes()}`;
    return actualDate;
}

export default dateParser;