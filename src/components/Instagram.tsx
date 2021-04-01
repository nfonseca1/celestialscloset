import { Interface } from 'node:readline';
import * as React from 'react';
import { Link } from 'react-router-dom';
import InstagramEmbed from 'react-instagram-embed';
import Context from '../lib/Context';
import { getAllInstagramPosts } from '../lib/database';
import cache from '../lib/cache';

// For running the instagram embed function through it's window property
declare global {
    interface Window { instgrm: any }
}

interface Props {
    context: Context
}

export default class Instagram extends React.Component<Props, { posts: string[] }> {
    constructor(props: Props) {
        super(props);

        let posts = getAllInstagramPosts();
        this.state = { posts: posts }
    }
    render() {
        cache.isPolling(true);
        document.body.style.overflowY = 'hidden';

        let backJSX = (
            <Link to='/'>
                <div className='Instagram-Background'></div>
            </Link>
        )
        if (this.props.context == "Collection") {
            backJSX = (
                <Link to='/collection'>
                    <div className='Instagram-Background'></div>
                </Link>
            )
        }

        let postJSX = this.state.posts.map(p => {
            return (
                <InstagramEmbed
                    url={p}
                    clientAccessToken='2500377140256298|3627d468c26c71d49ecc47cfcfe0f5a5'
                    maxWidth={1000}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => { }}
                    onSuccess={() => { }}
                    onAfterRender={() => { }}
                    onFailure={() => { }}
                    key={p}
                />
            )
        })

        return (
            <div className='Instagram-Container'>
                {backJSX}
                <div className='Instagram'>
                    <div className="header">
                        <div className="title">DM me on Instagram for questions or custom orders!</div>
                        <div className="insta-button"><a href="https://www.instagram.com/celestials_closet/" target="_blank">Go To Instagram</a></div>
                    </div>
                    <div className="posts">
                        <div className="post-container">
                            {postJSX}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        cache.setPollBuffer(1000);
        cache.isPolling(false);
    }
}