export const getFechaAhora = async () => {

    const date = new Date().toLocaleString("es-ve", { timeZone: "America/Caracas", hour12: false });
    console.log(date);
    let [dateValues, timeValues] = date.split(', ');
    let [month, day, year] = dateValues.split('/');
    if (timeValues.slice(0, 2) == "24") {
        timeValues = `00${timeValues.slice(2, timeValues.length)}`
    };
    const formatedDate = `${year}-${day}-${month} ${timeValues}`;
    console.log(formatedDate);
    return formatedDate;

};
