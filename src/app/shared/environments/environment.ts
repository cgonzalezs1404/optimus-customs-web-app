export const environment = {
    production: false,
    https: false,
    version: '1.0.0',
    company: 'Optimus Customs',
    storage: 'opt-custm',
    app: {
        root: 'http://localhost:4200/home',
        name: 'Optimus Customs',
        host: 'http://localhost:4200',
        api: 'http://localhost/OptimusCustoms.Api',
        route: {
            complemento_pago: '/api/complemento_pago',
            comprobante_pago: '/api/comprobante_pago',
            consumidor: '/api/consumidor',
            estado: '/api/estado',
            factura: '/api/factura',
            operacion: '/api/operacion',
            operacion_x_factura: '/api/pperacion_factura',
            privilegio: '/api/privilegio',
            giro: '/api/giro',
            usuario: '/api/usuario',
            usuario_token_login: '/api/usuario_token/login',
            usuario_token_refresh: '/api/usuario_token/refresh',
            usuario_token_session: 'api/usuario_token/session',
            usuario_x_privilegio: '/api/usuario_privilegio'
        },
        login:{
            name:'login',
            route: '/login'
        },
        home:{
            name:'home',
            route: '/home'
        }
    }
};

