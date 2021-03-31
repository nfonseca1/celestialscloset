import { Interface } from 'node:readline';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Context from '../lib/Context';
import { getAllInstagramPosts } from '../lib/database';

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
                <div className="instagram-post" key={p}>
                    <blockquote style={{ width: '100%' }} className="instagram-media" data-instgrm-permalink={`${p}?utm_source=ig_embed&amp;utm_campaign=loading`} data-instgrm-version="13"><a href={`${p}?utm_source=ig_embed&amp;utm_campaign=loading`}></a><a href={`${p}?utm_source=ig_embed&amp;utm_campaign=loading`} target="_blank"></a></blockquote>
                    <script async src="https://www.instagram.com/embed.js"></script>
                </div>
            )
        })
        setTimeout(() => {
            if ('instgrm' in window) {
                window.instgrm.Embeds.process()
            }
        }, 200);

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
}