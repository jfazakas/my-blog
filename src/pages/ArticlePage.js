import React, { useState, useEffect } from 'react';
import articleContent from './article-content';
import ArticlesList from '../components/ArticlesList';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import UpvoteSection from '../components/UpvoteSection';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = ({ match }) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);

    const [articleInfo, setArticleInfo] = useState({
        upvotes: 0,
        comments: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();

            setArticleInfo(body);
        }

        fetchData();
    }, [name]);

    if(!article) {
        return <NotFoundPage/>
    }

    const otherArticles = articleContent.filter(article => article.name !== name);

    return (
        <React.Fragment>
            <h1>{article.title}</h1>
            <UpvoteSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
            {article.content.map((paragraph, key) => (
                <p key={key}>{paragraph}</p>
            ))}
            <hr/>
            <CommentsList comments={articleInfo.comments} />
            <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
            <h3>Other articles:</h3>
            <ArticlesList articles={otherArticles} />
        </React.Fragment>
    );
}

export default ArticlePage;
