const smsApi = async (mobileNumber, body) => {

    const ex = "+63"
    const num = mobileNumber
    console.log(ex.concat(num))
    console.log("Sending SMS...");
    // const apiToken = "2e5f354c-5128-4741-9516-e2aab0938bf1"
    const cloudApiToken = "dJSe5LGsTPeFEESM-Ky771:APA91bHX02UjK52voDDxqPml2NxkOjhkf7c8NOGVL_iH-jtEU9reudjzVEpOyfrZ0Ukpq5pXg7hxzm_S_j4TToEwNbvYuyMoTEdBoXFEVLXDN8zZoePUVG8"
    try {
        const res = await fetch("https://www.traccar.org/sms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cloudApiToken
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
