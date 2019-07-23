module.exports = (app) => {
    const user = require('../controllers/user.controllers');
    var auth = require('../middleware/auth')
    const komoditas = require('../controllers/komoditas.controllers');


    //post to server database
    app.post('/api/user', user.create_user)
    app.get('/api/user/:id', user.show_user)
    app.get('/api/user/auth', auth.isAuth, user.show_user)
    app.put('/api/user/:id', auth.isAuth,  user.update_user)
    app.delete('/api/user/delete/:id', auth.isAuth,  user.delete_user)
    app.post('/api/user/login', user.user_login )
    app.get('/api/user/verify', user.user_verify)
    app.post('/api/komoditas/post', auth.isAuth, komoditas.komoditas_post )
    app.get('/api/komoditas/data',  komoditas.komoditas_data)
    app.get('/api/komoditas/data',  komoditas.komoditas_data)
    app.get('/api/komoditas/data/:id',  komoditas.komoditas_id)
    app.get('/api/user/peternak/:author', auth.isAuth, user.peternak_data)
    app.post('/api/user/invest/lot/:id', auth.isAuth, user.invest_lot)
    app.post('/api/user/invest/data/:id', auth.isAuth, user.user_invest)
    app.get('/api/user/peternak/:author', auth.isAuth, user.peternak_data)
    app.get('/api/user/investor/:investor', auth.isAuth, user.investor_data)
    app.get('/api/user/investor/pembayaran/:invest', auth.isAuth,  user.update_pembayaran)

    
}