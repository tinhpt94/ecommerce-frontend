/**
 * Created by tinhpt on 2/21/17.
 */
import React from 'react'

class Footer extends React.Component {
  render() {
    return(
      <div className="footer">
        <div className="information">
          <div className="infor-top">
            <div className="col-md-3 infor-left">
              <h3>Follow Us</h3>
              <ul>
                <li>
                  <a href="#">
                    <span className="fb"></span>
                    <h6>Facebook</h6>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="twit"></span>
                    <h6>Twitter</h6>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="google"></span>
                    <h6>Google</h6>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 infor-left">
              <h3>Information</h3>
              <ul>

              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
