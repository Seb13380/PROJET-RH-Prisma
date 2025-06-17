const authguard = require('../services/authguard')

router.get('/', authguard, mainController.getHome)

router.get('/logout', RHController.getLogout)

