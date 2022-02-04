import React from 'react';
import Navigation from "../../Component/Public/Navigation";
const PublicLayout = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
};

export default PublicLayout;