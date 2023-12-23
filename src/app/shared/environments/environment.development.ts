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
            complemento_pago: '/api/ComplementoPago',
            comprobante_pago: '/api/ComprobantePago',
            consumidor: '/api/ComprobantePago',
            estado: '/api/Estado',
            factura: '/api/Factura',
            operacion: '/api/Operacion',
            operacion_x_factura: '/api/OperacionXFactura',
            privilegio: '/api/Privilegio',
            tipo_servicio: '/api/TipoServicio',
            usuario: '/api/Usuario',
            usuario_token_login: '/api/UsuarioToken/login',
            usuario_token_refresh: '/api/UsuarioToken/refresh',
            usuario_token_session: 'api/UsuarioToken/session',
            usuario_x_privilegio: '/api/UsuarioXPrivilegio'
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
