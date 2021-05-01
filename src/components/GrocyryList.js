import React from 'react';
import { useText, ButtonGroup } from '@urban-bot/core';

const GroceryList = ({ addItem, title, listButtons }) => {
    useText((props) => {
        addItem(props.text);
        console.log(props);
    });
    return (
        <ButtonGroup title={title} maxColumns={3}>
            {listButtons}
        </ButtonGroup>
    );
};

export default GroceryList;
