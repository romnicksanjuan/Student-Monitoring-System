const smsApi = async (mobileNumber, body) => {

    // const ex = "+63"
    // const num = mobileNumber
    console.log(mobileNumber)
    console.log("Sending SMS...");
    const apiToken = "2e5f354c-5128-4741-9516-e2aab0938bf1"
    const cloudApiToken = "dJSe5LGsTPeFEESM-Ky771:APA91bHX02UjK52voDDxqPml2NxkOjhkf7c8NOGVL_iH-jtEU9reudjzVEpOyfrZ0Ukpq5pXg7hxzm_S_j4TToEwNbvYuyMoTEdBoXFEVLXDN8zZoePUVG8"

    const localApi = "http://192.168.149.38:8082"
    const traccarApi = "https://www.traccar.org/sms"
    try {
        const res = await fetch(traccarApi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cloudApiToken
            },
            body: JSON.stringify({
                to: mobileNumber,
                message: body
            })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        console.log(res)
    } catch (error) {
        console.error("Error sending SMS:", error);
    }
};

module.exports = { smsApi }
