const dateAttendace = () => {
    return new Promise((resolve) => {
        const date = new Date().toLocaleString("en-US", { timeZone: 'Asia/Manila', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
        resolve(date)
    })
}

const messageFunction = (name, date, isCheckIn, busDriver, plateNumber) => {
    return new Promise((resolve, reject) => {
        if (!name || !date || !busDriver || !plateNumber) {
            return reject('Missing required info.');
        }

        const bool = isCheckIn ? 'board on' : 'board off' 
        // const message = `Hi Ma'am/Sir, this is to inform you that ${name} has ${bool} the bus on ${date}. Bus Driver: ${busDriver} Bus Plate Number: ${plateNumber}`;
        const message = `${name} ${bool} the bus on  ${date}, 2025 at 12:52 PM. Driver: ${busDriver}. Plate No:${plateNumber}. —SHS Monitoring Team`
        resolve(message);
    });
};


module.exports = { dateAttendace, messageFunction }