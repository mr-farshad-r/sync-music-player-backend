const router = require('express').Router();
const {getRadioJavanUrl} = require("../helpers/radio-javan");

router.post('/', async (req, res, next) => {
    const {url} = req.body;
    const music = await getRadioJavanUrl(url);

    res.status(200).json({
        success: true,
        data: {
            url: music
        }
    });
});

module.exports = router;
