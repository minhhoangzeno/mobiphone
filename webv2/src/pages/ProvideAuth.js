import React, { useEffect, useState } from "react";
// import { AppRoute, routes } from "../../AppRoutes";
import {
    Redirect, Route, Switch
} from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
import Sidebar from "../components/Sidebar";
import { Routes } from "../routes";
import Blog from "../pages/client/BlogPage";
import BlogAdd from './blog/BlogAdd';
import BlogDetail from "../pages/client/BlogDetail";
import BlogEdit from "./blog/BlogEdit";

import CountdownPage from "./client/CountdownPage";
import HistoryUserVote from "./client/HistoryUserVote";
import HomePageClient from "./client/HomePageClient";
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
import CountdownAdd from "./countdown/CountdownAdd";
import CountdownEdit from "./countdown/CountdownEdit";
import ChangePassword from "./examples/ChangePassword";
import Product from "./product/Product";
import ProductAdd from "./product/ProductAdd";
import ProductEdit from "./product/ProductEdit";
import Settings from './Settings';
import BootstrapTables from "./tables/BootstrapTables";
import Transactions from "./Transactions";
import User from "./user/User";
import Video from "../pages/client/VideoPage";
import VideoAdd from "./video/VideoAdd";
import VideoDetail from "./video/VideoDetail";
import VideoEdit from "./video/VideoEdit";
import CartDetail from "./client/CartDetail";
import ProductDetail from "./client/ProductDetail";

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

           
            <Route exact path={Routes.DashboardOverview.path} component={HomePageClient}  />

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
            <RouteWithSidebar exact path={Routes.BlogAdd.path} component={BlogAdd} />
            <Route exact path={Routes.BlogDetail.path} component={BlogDetail} />
            <RouteWithSidebar exact path={Routes.BlogEdit.path} component={BlogEdit} />
          
            <Route exact path={Routes.BlogDetail.path} component={BlogDetail} />


            <Route exact path={Routes.Video.path} component={Video} />
            <RouteWithSidebar exact path={Routes.VideoAdd.path} component={VideoAdd} />
            <Route exact path={Routes.VideoDetail.path} component={VideoDetail} />
            <RouteWithSidebar exact path={Routes.VideoEdit.path} component={VideoEdit} />


            <RouteWithSidebar exact path={Routes.Product.path} component={Product} />
            <RouteWithSidebar exact path={Routes.ProductAdd.path} component={ProductAdd} />
            <RouteWithSidebar exact path={Routes.ProductEdit.path} component={ProductEdit} />

            <Route exact path={Routes.ProductDetail.path} component={ProductDetail} />
            <RouteWithSidebar exact path={Routes.ProductDetail.path} component={ProductDetail} />

            <Route exact path={Routes.Countdown.path} component={CountdownPage} />
            <RouteWithSidebar exact path={Routes.CountdownAdd.path} component={CountdownAdd} />
            <RouteWithSidebar exact path={Routes.CountdownEdit.path} component={CountdownEdit} />

            <RouteWithSidebar exact path={Routes.User.path} component={User} />
            <Route exact path={Routes.VoteUser.path} component={HistoryUserVote} />

            <Route exact path={Routes.VoteUser.path} component={HistoryUserVote} />


            <Route exact path={Routes.Cart.path} component={CartDetail} />

            <Redirect from="/" to="/" />
        </Switch>

    )
}
