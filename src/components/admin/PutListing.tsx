import * as React from 'react';
import PhotoPicker from './PhotoPicker';
import InputDropdown from './InputDropdown';
import ChakraDropdown from './ChakraDropdown';
import data from '../../lib/newListingData';

export default class PutListing extends React.Component<{}, { priceErr: string }> {
    constructor(props: {}) {
        super(props);

        this.state = { priceErr: '' }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCheckbox(e: React.ChangeEvent, label: string) {
        let status = (e.target as HTMLInputElement).value;
        data[label] = status === "on" ? true : false
    }

    handleSubmit() {
        let formData = new FormData();
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('stones', JSON.stringify(data.stones));
        formData.append('chakras', JSON.stringify(data.chakras));
        formData.append('benefits', JSON.stringify(data.benefits));
        for (let i = 0; i < data.photos.length; i++) {
            formData.append(`photo ${i}`, data.photos[i]);
        }

        var request = new XMLHttpRequest();
        request.open("POST", "/admin/listings/new");
        request.send(formData);
    }

    render() {
        return (
            <div>
                <div className="PutListing">
                    <div className="listing-details">
                        <h1>Post Details</h1>
                        <br /><br />

                        <PhotoPicker />

                        <div className="heading">Title</div>
                        <input type="text" name="title" onChange={(e: React.ChangeEvent) => { data.title = (e.target as HTMLInputElement).value }} />

                        <div className="heading">Price</div>
                        <div className="input-description error">{this.state.priceErr}</div>
                        <input type="text" name="price" onChange={(e: React.ChangeEvent) => { data.price = (e.target as HTMLInputElement).value; this.setState({ priceErr: '' }) }} />

                        <div className="heading">Description</div>
                        <textarea name="description" onChange={(e: React.ChangeEvent) => { data.description = (e.target as HTMLInputElement).value }}></textarea>

                        <div className="heading">Stones</div>
                        <div className="input-description">Types of crystal(s) used in the jewelry. Select from dropdown or enter a new one.</div>
                        <InputDropdown label={'stones'} />

                        <div className="heading">Chakras</div>
                        <div className="input-description">Chakras that are influenced by these stones. Select from dropdown.</div>
                        <ChakraDropdown />

                        <div className="heading">Benefits</div>
                        <div className="input-description">Physical, mental or spiritual benefits of this jewelry. Select from dropdown or enter a new one.</div>
                        <InputDropdown label={'benefits'} />
                    </div>
                    <div className="listing-settings">
                        <h1>Post Settings</h1>
                        <br /><br />

                        <div className="setting">
                            <div className="heading-container">
                                <div className="heading">Set Inactive</div>
                                <input id="post-inactive" type="checkbox" onChange={(e) => this.handleCheckbox(e, 'inactive')} />
                            </div>
                            <div className="input-description">When checked, the post will still exist, but it won't be publicly visible.</div>
                        </div>
                        <div className="setting">
                            <div className="heading-container">
                                <div className="heading">Hide Stones</div>
                                <input id="stones-hidden" type="checkbox" onChange={(e) => this.handleCheckbox(e, 'hideStones')} />
                            </div>
                            <div className="input-description">When checked, the stones section will not be visible.</div>
                        </div>
                        <div className="setting">
                            <div className="heading-container">
                                <div className="heading">Hide Chakras</div>
                                <input id="chakras-hidden" type="checkbox" onChange={(e) => this.handleCheckbox(e, 'hideChakras')} />
                            </div>
                            <div className="input-description">When checked, the chakras section will not be visible.</div>
                        </div>
                        <div className="setting">
                            <div className="heading-container">
                                <div className="heading">Hide Benefits</div>
                                <input id="benefits-hidden" type="checkbox" onChange={(e) => this.handleCheckbox(e, 'hideBenefits')} />
                            </div>
                            <div className="input-description">When checked, the benefits section will not be visible.</div>
                        </div>
                    </div>
                </div>
                <button className="listing-post-btn" onClick={this.handleSubmit}>Post</button>
            </div>
        )
    }
}