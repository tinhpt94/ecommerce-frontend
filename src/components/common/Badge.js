import React from "react";
import { FormattedNumber } from "react-intl";
import { number } from "prop-types";

export const PromotionBadge = () => ({
  render() {
    return (
      <div className="shop-badge shop-badge-fixed-width shop-badge-promotion">
        <div className="shop-badge-promotion-label-wrapper">
          <span className="percent">
            <FormattedNumber value={this.props.discount} />%
          </span>
          <span className="shop-badge-promotion-label-wrapper-off-label">
            GIẢM
          </span>
        </div>
      </div>
    );
  }
});

export const NewBadge = () => ({
  render() {
    return (
      <div className="shop-badge shop-badge-fixed-width shop-badge-new">
        <div className="shop-badge-new-label">Mới</div>
      </div>
    );
  }
});
