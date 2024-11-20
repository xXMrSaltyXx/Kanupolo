import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRouter = (Component) => {
    function ComponentWithRouterProps(props) {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProps;
};