
export const Routes = {
    // pages
    DashboardOverview: { path: "/" },
    Transactions: { path: "/transactions" },
    BootstrapTables: { path: "/tables/bootstrap-tables" },
    Billing: { path: "/examples/billing" },
    Invoice: { path: "/examples/invoice" },
    Signin: { path: "/sign-in" },
    VerifyEmail: { path: "/verify-email/:confirmationCode" },
    VerifyPassword: { path: "/verify-password/:confirmationCode" },
    VerifyPassword: { path: "/verify-password/:confirmationCode" },
    Order: { path: "/order" },
    OrderDetail: { path: "/order-detail" },
    Signup: { path: "/sign-up" },
    ForgotPassword: { path: "/forgot-password" },
    ResetPassword: { path: "/reset-password/:confirmationCode" },
    Lock: { path: "/lock" },
    NotFound: { path: "/examples/404" },
    PaymentSuccess: { path: "/payment-success" },

    PendingAccount: { path: "/pending-account" },


    // components
    Accordions: { path: "/components/accordions" },
    Alerts: { path: "/components/alerts" },
    Badges: { path: "/components/badges" },
    Widgets: { path: "/widgets" },
    Breadcrumbs: { path: "/components/breadcrumbs" },
    Buttons: { path: "/components/buttons" },
    Forms: { path: "/components/forms" },
    Modals: { path: "/components/modals" },
    Navs: { path: "/components/navs" },
    Navbars: { path: "/components/navbars" },
    Pagination: { path: "/components/pagination" },
    Popovers: { path: "/components/popovers" },
    Progress: { path: "/components/progress" },
    Tables: { path: "/components/tables" },
    Tabs: { path: "/components/tabs" },
    Tooltips: { path: "/components/tooltips" },
    Toasts: { path: "/components/toasts" },
    WidgetsComponent: { path: "/components/widgets" },
    Settings: { path: "/settings" },
    ChangePassword: { path: "/change-password" },
    // page - provide

    Blog: { path: "/blog" },
    BlogAdd: { path: "/blog/add" },
    // BlogDetail: { path: "/blog/detail" },
    BlogEdit: { path: "/blog/edit" },

    BlogDetail: {path: "/blog/detail"},

    Product: { path: "/product" },
    ProductAdd: { path: "/product/add" },
    ProductEdit: { path: "/product/edit" },

    ProductDetail: {path: '/product/detail'},

    Contact: {path: '/contact'},

    Fee: { path: "/fee" },
    FeeAdd: { path: "/fee/add" },
    FeeDetail: { path: "/fee/detail" },

    User: { path: "/user" },

    Cart: { path: "/cart"},

    Checkout: {path: "/checkout"},

    Confirmation: {path: "/confirmation"}
};