import React, { useEffect, useState } from "react";
// import { AppRoute, routes } from "../../AppRoutes";
import {
    Redirect, Route, Switch
} from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
import Sidebar from "../components/Sidebar";
import BlogDetail from "../pages/client/BlogDetail";
import Blog from "../pages/client/BlogPage";
import { Routes } from "../routes";
import CartDetail from "./client/CartDetail";
import Checkout from "./client/Checkout";
import Confirmation from "./client/Confirmation";
import Contact from "./client/Contact";
import HomePageClient from "./client/HomePageClient";
import Order from "./client/Order";
import OrderDetail from "./client/OrderDetail";
import PaymentSuccess from "./client/PaymentSuccess";
import Product from "./client/Product";
import ProductDetail from "./client/ProductDetail";
import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navbars from "./components/Navbars";
import Navs from "./components/Navs";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Toasts from "./components/Toasts";
import Tooltips from "./components/Tooltips";
import ChangePassword from "./examples/ChangePassword";
import Settings from './Settings';
import BootstrapTables from "./tables/BootstrapTables";
import Transactions from "./Transactions";





const RouteWithSidebar = ({ component: Component, ...rest }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const localStorageIsSettingsVisible = () => {
        return localStorage.getItem('settingsVisible') === 'false' ? false : true
    }

    const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
        localStorage.setItem('settingsVisible', !showSettings);
    }
    return (
        <Route {...rest} render={props => (
            <>
                <Preloader show={loaded ? false : true} />
                <Sidebar />

                <main className="content">
                    <Navbar />
                    <Component {...props} />
                    <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
                </main>
            </>
        )}
        />
    );
};


export default function ProvideAuth() {
    return (
        <Switch>


            <Route exact path={Routes.DashboardOverview.path} component={HomePageClient} />

            {/* pages */}
            {/* <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} /> */}
            <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
            <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />

            {/* components */}
            <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
            <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
            <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
            <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
            <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
            <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
            <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
            <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
            <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
            <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
            <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
            <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
            <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
            <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
            <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
            <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />
            <Route exact path={Routes.Settings.path} component={Settings} />
            <Route exact path={Routes.ChangePassword.path} component={ChangePassword} />
            {/* components */}

            <Route exact path={Routes.Blog.path} component={Blog} />
            <Route exact path={Routes.BlogDetail.path} component={BlogDetail} />



            <Route exact path={Routes.Product.path} component={Product} />
            <RouteWithSidebar exact path={Routes.Product.path} component={Product} />

            <Route exact path={Routes.ProductDetail.path} component={ProductDetail} />
            <RouteWithSidebar exact path={Routes.ProductDetail.path} component={ProductDetail} />


            <Route exact path={Routes.Contact.path} component={Contact} />
            <Route exact path={Routes.PaymentSuccess.path} component={PaymentSuccess} />

            <Route exact path={Routes.Cart.path} component={CartDetail} />
            <Route exact path={Routes.Order.path} component={Order} />
            <Route exact path={Routes.OrderDetail.path} component={OrderDetail} />

            <Route exact path={Routes.Checkout.path} component={Checkout} />

            <Route exact path={Routes.Confirmation.path} component={Confirmation} />

            <Redirect from="/" to="/" />
        </Switch>

    )
}
