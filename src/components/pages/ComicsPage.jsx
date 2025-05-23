import React from 'react';
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import { Helmet } from 'react-helmet';

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                />
                <title>Comics Page</title>
            </Helmet>
            <AppBanner />
            <ComicsList />
        </>
    );
};

export default ComicsPage;
