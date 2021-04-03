import * as React from 'react';
import PhotoPicker from './PhotoPicker';
import InputDropdown from './InputDropdown';
import ChakraDropdown from './ChakraDropdown';

export default class PutListing extends React.Component {
    render() {
        return (
            <div>
                <div className="PutListing">
                    <div className="listing-details">
                        <h1>Post Details</h1>
                        <br /><br />

                        <PhotoPicker />

                        <div className="heading">Title</div>
                        <input type="text" name="title" />

                        <div className="heading">Price</div>
                        <input type="text" name="price" />

                        <div className="heading">Description</div>
                        <textarea name="description"></textarea>

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
                                <input id="post-inactive" type="checkbox" />
                            </div>
                            <div className="input-description">When checked, the post will still exist, but it won't be publicly visible.</div>
                        </div>
                        <div className="setting">
                            <div className="heading-container">
                                <div className="heading">Hide Stones</div>
                                <input id="stones-hidden" type="checkbox" />
                            </div>
                            <div className="input-description">When checked, the stones section will not be visible.</div>
                        </div>
                        <div className="setting">
                            <div className="heading-container">
                                <div className="heading">Hide Chakras</div>
                                <input id="chakras-hidden" type="checkbox" />
                            </div>
                            <div className="input-description">When checked, the chakras section will not be visible.</div>
                        </div>
                        <div className="setting">
                            <div className="heading-container">
                                <div className="heading">Hide Benefits</div>
                                <input id="benefits-hidden" type="checkbox" />
                            </div>
                            <div className="input-description">When checked, the benefits section will not be visible.</div>
                        </div>
                    </div>
                </div>
                <button className="listing-post-btn">Post</button>
            </div>
        )
    }
}