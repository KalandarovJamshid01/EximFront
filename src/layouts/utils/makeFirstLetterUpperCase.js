const makeFirstLetterUpperCase = (name, short=false) => {
    const newTrimmedName = name.split(" ").map(splitedName => {
        return `${splitedName.charAt(0)}${splitedName.slice(1, splitedName.length).toLowerCase()}`
    });
    if (short) return newTrimmedName[0] + ' ' + newTrimmedName[1];
    else return newTrimmedName.join(' ')
}

export default makeFirstLetterUpperCase;