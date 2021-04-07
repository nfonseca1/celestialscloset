import * as React from 'react';
import PhotoPicker from './PhotoPicker';
import InputDropdown from './InputDropdown';
import ChakraDropdown from './ChakraDropdown';
import { match, Redirect } from 'react-router';
import { History, Location } from 'history';
import newListingData from '../../lib/newListingData';
import { getProductById } from '../../lib/database';

interface Props {
    match?: match<{ id?: string }>,
    location?: Location,
    history?: History,
}

interface State {
    values?: {
        photos?: string[],
        title?: string,
        price?: string,
        description?: string,
        stones?: string[],
        chakras?: string[],
        benefits?: string[],
        isActive?: boolean,
        options?: {
            hideStones?: boolean,
            hideChakras?: boolean,
            hideBenefits?: boolean
        }
    },
    priceErr?: string,
    redirect?: boolean
}

export default class PutListing extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // If there is a post id in the url params, grab the newListingData to populate the page
        if (this.props.match?.params?.id) {
            this.state = { values: null, priceErr: '' }

            getProductById(this.props.match.params.id)
                .then(vals => {
                    this.setState({
                        values: {
                            photos: vals.photos.map(p => p.link),
                            title: vals.title,
                            price: vals.price?.toString() || '',
                            description: vals.description,
                            isActive: vals.isActive === 'true',
                            stones: vals.details.stones.map(s => s.stone),
                            chakras: vals.details.chakras,
                            benefits: vals.details.benefits,
                            options: vals.options
                        }
                    }, () => {
                        newListingData.id = this.props.match.params.id;
                        newListingData.title = vals.title;
                        newListingData.price = vals.price?.toString() || '';
                        newListingData.description = vals.description;
                        newListingData.stones = vals.details.stones.map(s => s.stone);
                        newListingData.chakras = vals.details.chakras;
                        newListingData.benefits = vals.details.benefits;
                        newListingData.isActive = vals.isActive === 'true';
                        newListingData.options = vals.options;
                    })
                })
        }
        // ...Otherwise this will be a new listing. Start from scratch
        else {
            this.state = {
                values: {
                    photos: [],
                    title: '',
                    price: '',
                    description: '',
                    stones: [],
                    isActive: true,
                    chakras: [],
                    benefits: [],
                    options: {}
                }
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleInactive(e: React.ChangeEvent) {
        let status = (e.target as HTMLInputElement).checked;
        newListingData.isActive = !status;
        this.setState((state) => ({
            values: {
                ...state.values,
                isActive: !status
            }
        }))
    }

    handleCheckbox(e: React.ChangeEvent, label: 'hideStones' | 'hideChakras' | 'hideBenefits') {
        let status = (e.target as HTMLInputElement).checked;
        if (!newListingData.options) newListingData.options = {};
        newListingData.options[label] = status;
        this.setState((state) => ({
            values: {
                ...state.values,
                options: {
                    ...state.values.options,
                    [label]: status
                }
            }
        }))
    }

    handleSubmit() {
        // Validate the price, but allow it to also be empty
        if (isNaN(parseFloat(newListingData.price)) && newListingData.price !== '') {
            this.setState({ priceErr: 'Price should just be a number. Integer or decimal value.' })
            return;
        }
        // Send newListingData with a formnewListingData instance (because of photo blobs)
        let formData = new FormData();
        if (newListingData.id) formData.append('id', newListingData.id);
        formData.append('isActive', newListingData.isActive);
        formData.append('title', newListingData.title);
        formData.append('price', newListingData.price);
        formData.append('description', newListingData.description);
        formData.append('stones', JSON.stringify(newListingData.stones));
        formData.append('chakras', JSON.stringify(newListingData.chakras));
        formData.append('benefits', JSON.stringify(newListingData.benefits));
        formData.append('options', JSON.stringify(newListingData.options));
        for (let i = 0; i < newListingData.photos.length; i++) {
            formData.append(`photo ${i}`, newListingData.photos[i]);
        }

        var request = new XMLHttpRequest();
        request.open("POST", "/admin/listings/new");
        request.send(formData);
        this.setState({
            redirect: true
        })
    }

    handleChange(e: React.ChangeEvent, label: 'title' | 'price' | 'description') {
        newListingData[label] = (e.target as HTMLInputElement).value;
        this.setState((state) => ({
            values: {
                ...state.values,
                [label]: (e.target as HTMLInputElement).value
            },
            priceErr: label === 'price' ? '' : state.priceErr
        }))
    }

    render() {
        // When the defaults have been establish, render the JSX. Display loading in the meantime.
        let renderJSX = <h2>Loading...</h2>
        if (this.state.values !== null) {
            renderJSX = (
                <div>
                    <div className="PutListing">
                        <div className="listing-details">
                            <h1>Post Details</h1>
                            <br /><br />

                            <PhotoPicker photos={this.state.values.photos} />

                            <div className="heading">Title</div>
                            <input type="text" name="title" onChange={(e) => this.handleChange(e, 'title')} value={this.state.values.title} />

                            <div className="heading">Price</div>
                            <div className="input-description error">{this.state.priceErr}</div>
                            <input type="text" name="price" onChange={(e) => this.handleChange(e, 'price')} value={this.state.values.price} />

                            <div className="heading">Description</div>
                            <textarea name="description" defaultValue={this.state.values.description} onChange={(e) => this.handleChange(e, 'description')}></textarea>

                            <div className="heading">Stones</div>
                            <div className="input-description">Types of crystal(s) used in the jewelry. Select from dropdown or enter a new one.</div>
                            <InputDropdown label={'stones'} selections={this.state.values.stones} />

                            <div className="heading">Chakras</div>
                            <div className="input-description">Chakras that are influenced by these stones. Select from dropdown.</div>
                            <ChakraDropdown selections={this.state.values.chakras} />

                            <div className="heading">Benefits</div>
                            <div className="input-description">Physical, mental or spiritual benefits of this jewelry. Select from dropdown or enter a new one.</div>
                            <InputDropdown label={'benefits'} selections={this.state.values.benefits} />
                        </div>
                        <div className="listing-settings">
                            <h1>Post Settings</h1>
                            <br /><br />

                            <div className="setting">
                                <div className="heading-container">
                                    <div className="heading">Set Inactive</div>
                                    <input id="post-inactive" type="checkbox" onChange={(e) => this.handleInactive(e)} defaultChecked={!this.state.values.isActive} />
                                </div>
                                <div className="input-description">When checked, the post will still exist, but it won't be publicly visible.</div>
                            </div>
                            <div className="setting">
                                <div className="heading-container">
                                    <div className="heading">Hide Stones</div>
                                    <input id="stones-hidden" type="checkbox" onChange={(e) => this.handleCheckbox(e, 'hideStones')} defaultChecked={this.state.values.options.hideStones} />
                                </div>
                                <div className="input-description">When checked, the stones section will not be visible.</div>
                            </div>
                            <div className="setting">
                                <div className="heading-container">
                                    <div className="heading">Hide Chakras</div>
                                    <input id="chakras-hidden" type="checkbox" onChange={(e) => this.handleCheckbox(e, 'hideChakras')} defaultChecked={this.state.values.options.hideChakras} />
                                </div>
                                <div className="input-description">When checked, the chakras section will not be visible.</div>
                            </div>
                            <div className="setting">
                                <div className="heading-container">
                                    <div className="heading">Hide Benefits</div>
                                    <input id="benefits-hidden" type="checkbox" onChange={(e) => this.handleCheckbox(e, 'hideBenefits')} defaultChecked={this.state.values.options.hideBenefits} />
                                </div>
                                <div className="input-description">When checked, the benefits section will not be visible.</div>
                            </div>
                        </div>
                    </div>
                    <button className="listing-post-btn" onClick={this.handleSubmit}>Post</button>
                </div>
            )
        }
        if (this.state.redirect) {
            renderJSX = <Redirect to="/admin/home" />
        }

        return renderJSX;
    }
}