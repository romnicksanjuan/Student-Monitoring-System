const dateAttendace = () => {
    return new Promise((resolve) => {
        const date = new Date().toLocaleString("en-US", { timeZone: 'Asia/Manila', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
        resolve(date)
    })
}

const message = (name, date, isCheckIn, busDriver, plateNumber) => {
    // const message = `Hi Ma'am/Sir, This is to inform you that ${name} has ${isCheckIn ? 'got on' : 'got off'}  the bus on ${date}`

    return new Promise((resolve, reject) => {
        const message = `Hi Ma'am/Sir,This is to inform you that ${name} has ${isCheckIn ? 'board on' : 'board off'} the bus on ${date}.
    Bus Driver:${busDriver}Bus Plate Number: ${plateNumber}`
        resolve(message)
    })
}

module.exports = { dateAttendace, message }