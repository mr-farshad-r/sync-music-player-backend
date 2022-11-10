const router = require('express').Router();

router.get('/', function(req, res, next) {
    const RESPONSE = {
        status: 200,
        result: {
            success: true,
            data: {},
            message: 'Music Player Sync'
        }
    };
    res.status(RESPONSE.status).json(RESPONSE.result);
});

module.exports = router;
