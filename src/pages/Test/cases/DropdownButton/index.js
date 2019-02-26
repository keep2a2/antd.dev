import React from "react";
import { Button, Dropdown, Icon, Menu, message } from "antd";

const ButtonGroup = Button.Group;

class DropdownButton extends React.Component {
    
    handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
    }
    
    handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    }

    render() {

        const menu = (
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="1"><Icon type="user" />1st menu item</Menu.Item>
              <Menu.Item key="2"><Icon type="user" />2nd menu item</Menu.Item>
              <Menu.Item key="3"><Icon type="user" />3rd item</Menu.Item>
            </Menu>
        );

          
        return (
            <div className="dropdown-button">
                <ButtonGroup>
                    <Button>Cancel</Button>

                    <Dropdown overlay={menu}>
                        <Button style={{padding: '0 5px'}}><i className="icon ap ap-anglepointingtodown-copy" style={{ height: '20px', lineHeight: '20px' }} /></Button>
                    </Dropdown>
                </ButtonGroup>
            </div>
        );
    }
}

export default DropdownButton;
