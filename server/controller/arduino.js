const test = (req, res) => {
    const { uid } = req.body
    console.log("Received Uid", uid)
    res.json({ message: "Uid Received Successfully", uid: uid })
}

module.exports = test