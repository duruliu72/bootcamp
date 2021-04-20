import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from "./services/authService"
function ProtectedRoute({ children, ...rest }) {
    let user = auth.authUser();
    return (
        <Route
            {...rest}
            render={({ location }) => {
                // console.log(Location);
                return (
                    user ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                )
            }
            }
        />
    );
}
export default ProtectedRoute;