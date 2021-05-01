import React, { useState } from 'react';
import { Route, Router, Text, Button } from '@urban-bot/core';
import GroceryList from './components/GrocyryList';
import CleanList from './components/CleanList';

export function App() {
    const [grocyryList, setGrocyryList] = useState([]);
    const addItem = (text) => setGrocyryList([...grocyryList, { text, id: Math.random(), isCompleted: false }]);
    const changeItemStatus = (itemId) => {
        const newGroceryList = grocyryList.map((item) => {
            if (item.id === itemId) {
                return {
                    ...item,
                    isCompleted: !item.isCompleted,
                };
            }
            return item;
        });
        setGrocyryList(newGroceryList);
    };
    const cleanList = () => setGrocyryList([]);
    const title = grocyryList.map((item) => (
        <>
            {item.isCompleted ? <s>{item.text}</s> : item.text}
            <br />
        </>
    ));

    const listButtons = grocyryList.map(({ text, id }) => (
        <Button key={id} onClick={() => changeItemStatus(id)}>
            {text}
        </Button>
    ));

    if (grocyryList.length === 0) {
        return <Text>Список покупок пуст</Text>;
    }

    const baseProps = {
        list: grocyryList,
        title,
        listButtons,
        changeItemStatus,
        addItem,
    };

    return (
        <Router withInitializeCommands>
            <Route path="/clean" description="Очистить список покупок">
                <CleanList cleanList={cleanList} />
            </Route>
            <Route path="/start" description="Начать">
                <GroceryList {...baseProps} />
            </Route>
        </Router>
    );
}
