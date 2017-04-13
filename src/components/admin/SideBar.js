import React, {Component} from "react";
import styled from "styled-components";
import SideNav, {Nav, NavIcon, NavText} from "react-sidenav";
import SvgIcon from "react-icons-kit";
import {ic_aspect_ratio} from "react-icons-kit/md/ic_aspect_ratio";
import {ic_business} from "react-icons-kit/md/ic_business";
import {ic_business_center} from "react-icons-kit/md/ic_business_center";
import {ic_format_list_bulleted} from "react-icons-kit/md/ic_format_list_bulleted";
import {Link} from "react-router";

const Icon20 = (props) => (<SvgIcon size={props.size || 20} icon={props.icon}/>);

const BaseContainer = props => <div style={{
  display: 'inline-block',
  paddingTop: 16,
  paddingBottom: 16,
  fontFamily: 'Roboto',
  width: 240, ...props.style
}}>{props.children}</div>;

const Title = styled.div`
    padding: 12px;    
`;

const Separator = styled.div`
    padding-right: 12px;
`;
const SeparatorTitleContainer = styled.div`
    font-size: 14px;
    color: #AAA;
    margin: 10px 12px;
    padding: 4px 12px 2px;
`;
const SeparatorTitle = (props) => {
  return (
    <SeparatorTitleContainer>
      { props.children }
      <hr style={{border: 0, borderTop: '1px solid #E5E5E5'}}/>
    </SeparatorTitleContainer>
  );
};

class SideBar extends Component {
  render() {
    return (
      <div style={{display: 'flex'}} className="side-bar">
        <BaseContainer style={{
          background: '#FFF',
          color: '#444',
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
        }}>
          <SideNav highlightBgColor='#eee' defaultSelected='products' highlightColor='#E91E63'>
            <SeparatorTitle>
              <div>Main</div>
            </SeparatorTitle>
            <Nav id='dashboard'>
              <NavIcon><Icon20 icon={ic_aspect_ratio}/></NavIcon>
              <NavText> Dashboard </NavText>
            </Nav>

            <Link to="/admin/products" activeClassName="active">
              <Nav id='products'>
                <NavIcon><Icon20 icon={ic_business_center}/></NavIcon>
                <NavText>Products</NavText>
              </Nav>
            </Link>

            <Link to="/admin/orders" activeClassName="active">
              <Nav id='orders'>
                <NavIcon><Icon20 icon={ic_format_list_bulleted}/></NavIcon>
                <NavText>Orders</NavText>
              </Nav>
            </Link>
            <Link to="/admin/report" activeClassName="active">
              <Nav id='sales'>
                <NavIcon><Icon20 icon={ic_business}/></NavIcon>
                <NavText> Report </NavText>
              </Nav>
            </Link>
          </SideNav>
        </BaseContainer>
      </div>
    )
  }
}

export default SideBar