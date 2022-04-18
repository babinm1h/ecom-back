


class StripeController {

    async stripe(req, res) {
        try {

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }

}


export default new StripeController()