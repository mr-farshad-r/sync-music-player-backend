const router = require('express').Router();
const {getRadioJavanDetails} = require("../helpers/radio-javan");
const {download} = require("../helpers/downloader");

router.post('/', async (req, res, next) => {
    const {url} = req.body;
    const {url: music, details: {permlink}} = await getRadioJavanDetails(url);

    await download(music, './public/dl/', permlink, 'mp3');

    res.status(200).json({
        success: true,
        data: {
            test: `/dl/${permlink}.mp3`,
            url: music
        }
    });
});

module.exports = router;
