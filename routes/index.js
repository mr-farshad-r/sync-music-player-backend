const router = require('express').Router();

router.get('/', function(req, res, next) {
    res.status(200).json({
        success: true,
        data: {
            message: 'Sync Music Player API'
        }
    });
});

module.exports = router;
