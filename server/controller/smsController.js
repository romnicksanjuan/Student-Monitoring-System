const smsApi = async (mobileNumber, body) => {

    const ex = "+63"
    const num = mobileNumber
    console.log(ex.concat(num))
    console.log("Sending SMS...");
    const apiToken = "2e5f354c-5128-4741-9516-e2aab0938bf1"
    try {
        const res = await fetch("http://192.168.89.205:8082", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": apiToken
            },
            body: JSON.stringify({
                to: ex.concat(num),
                message: body
            })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        // console.log(res)
    } catch (error) {
        console.error("Error sending SMS:", error);
    }
};

module.exports = { smsApi }
