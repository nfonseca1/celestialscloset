import * as React from 'react';
import PhotoPicker from './PhotoPicker';
import InputDropdown from './InputDropdown';
import ChakraDropdown from './ChakraDropdown';

export default class PutListing extends React.Component {
    render() {
        return (
            <div className="PutListing">
                <div className="listing-details">
                    <h2>Listing Details</h2>

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
                    <div className="input-description">Chakras that are influenced by these stones</div>
                    <ChakraDropdown />

                    <div className="heading">Benefits</div>
                    <div className="input-description">Physical, mental or spiritual benefits of this jewelry</div>
                    <InputDropdown label={'benefits'} />
                </div>
                <div className="listing-settings"></div>
            </div>
        )
    }
}