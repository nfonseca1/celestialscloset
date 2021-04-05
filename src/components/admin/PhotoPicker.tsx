import * as React from 'react';
import data from '../../lib/newListingData';

interface State {
    previews: JSX.Element[]
}

export default class PhotoPicker extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = { previews: [] }

        this.handleSelection = this.handleSelection.bind(this);
    }

    handleUploadClick() {
        (document.querySelector(".upload-input") as HTMLInputElement).click();
    }

    handleSelection(e: React.ChangeEvent) {
        let promises: Promise<JSX.Element>[] = [];

        let files = (e.target as HTMLInputElement).files;
        if (files) {
            let length = files.length < 10 ? files.length : 10;

            data.photos = [...files].slice(0, length);

            for (let i = 0; i < length; i++) {
                let file = files[i];

                let dataReader = new FileReader();
                let p: Promise<JSX.Element> = new Promise(resolve => {
                    dataReader.onload = (e) => {
                        resolve(<img src={e.target.result as string} className="preview" key={e.target.result as string} />)
                    }
                })
                promises.push(p);
                dataReader.readAsDataURL(file);
            }
        }
        Promise.all(promises)
            .then(images => {
                this.setState({
                    previews: images
                })
            })
    }

    render() {
        return (
            <div className="PhotoPicker">
                <div className="heading">Photos</div>
                <div className="input-description">Select up to 10 photos. The order you select them in will be the order they display in.</div>
                <button type="button" className="upload-input-btn" onClick={this.handleUploadClick}>Select Images</button>
                <span>{this.state.previews.length} Images</span>
                <input className="upload-input" type="file" accept=".jpg, .jpeg, .png" multiple onChange={this.handleSelection}></input>
                <div className="image-previews">{this.state.previews}</div>
            </div>
        )
    }
}