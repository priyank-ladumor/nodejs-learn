var jwt = require('jsonwebtoken');

const Auth = ((req, res, next) => {
    try {
        // const public_key = fs.readFileSync(path.resolve(__dirname, './public.key'), 'utf-8')
        // var decoded = jwt.verify(req.headers.authorization, public_key);
        var decoded = jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY);
        console.log(decoded);
        if (decoded.email) {
            next()
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        res.sendStatus(401)
    }
})

module.exports = Auth