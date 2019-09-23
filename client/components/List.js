import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from "../index.css";
const axios = require('axios');
const BASE_URL = 'http://localhost:3000/';


class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      imageUrls: [],
      message: ''
    }
    this.selectImages = this.selectImages.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
  }

  componentDidMount() {
    axios.get(BASE_URL + 'api/uploads/')
      .then(result => {
        console.log('in list component, get upload', result.data);
        const newImages = [...this.state.images];

        result.data.forEach(obj => newImages.push(obj.encode))
        this.setState({images: newImages})
      })
      .catch(e => console.error('error in getting uploads', e))
  }

  selectImages(event) {
    let images = [];
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    let message = `${images.length} valid image(s) selected`;
    this.setState({ images, message })
  };

  uploadImages() {
    const uploaders = this.state.images.map(image => {
      const data = new FormData();
      data.append("image", image, image.name);
      // Make an AJAX upload request using Axios
      console.log('data', data);
      return axios.post(BASE_URL + 'api/items', data)
        .then(response => {
          this.setState({
            imageUrls: [ response.data.imageUrl, ...this.state.imageUrls ]
          });
        })
    });
    // Once all the files are uploaded 
    axios.all(uploaders)
      .then(() => {
        console.log('done');
      })
      .catch(err => alert(err.message));
    }

    render() {
      // console.log('images arr', this.state.images);
      return (
        <div>
          <br/>
          <div className="col-sm-12">
          <h1>Image Uploader</h1><hr/>

          <div className="col-sm-4">
          <input className="form-control " type="file" onChange={this.selectImages} multiple/>
          </div>

          <p className="text-info">{this.state.message}</p>
          <br/><br/><br/>
          <div className="col-sm-4">
          <button className="btn btn-primary" value="Submit" onClick={this.uploadImages}>Submit</button>
          </div>
          </div>

          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><hr/><br/>
          <div className="row col-lg-12">
          { 
            this.state.images.map((base64, i) => (
              <div key={i}>
                <img src={`data:image/png;base64, ${base64}`} />
              </div>
            ))
            // this.state.imageUrls.map((url, i) => (
            //   <div className="col-lg-2" key={i}>
            //     <img src={BASE_URL + url} className="img-rounded img-responsive" alt="not available"/>
            //     <br/>
            //   </div>
            // ))
          }
          </div>
        </div>
      );
    }

  // render() {
  //   return (
  //     <div>
  //       List
  //     </div>
  //   );
  // }

}

export default List;
